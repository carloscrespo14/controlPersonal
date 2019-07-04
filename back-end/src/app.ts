import bodyParser from 'body-parser';
import { Application, NextFunction, Request, Response } from 'express';
import express from 'express';
import { ValidationError } from 'express-json-validator-middleware';
import * as ip from 'ip';
import swaggerUi from 'swagger-ui-express';
import {createConnection} from 'typeorm';
import { IController } from './controllers/controller.interface';
import swaggerDocument from './swagger.json';

export class App {
  ipAddress: string;
  app: express.Application;
  port: number;

  constructor(controllers: IController[], port: number) {
    this.ipAddress = ip.address() || 'localhost';
    this.app = express();
    this.port = port;
    createConnection().then(() => {
      this.init();
      this.initControllers(controllers);
    }, (error) => {
      console.log(error);
    }).catch((error) => {
      console.log(error);
    });

  }

  private init() {
    this.app.use('/schemas', express.static('dist/schemas'));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));

    // headers
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Headers',
        'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method',
      );
      res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, DELETE',
      );
      res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
      next();
    });
  }

  private initControllers(controllers: IController[]) {
    controllers.forEach((controller: IController) => {
      this.app.use('/api', controller.router);
    });
    this.app.use(
      (
        err: any,
        req: Request,
        res: Response,
        next: NextFunction,
      ) => {
        console.log(err);
        if (err instanceof ValidationError) {
          const errorMessage = {
            url: req.url,
            method: req.method,
            message: 'Invalid parameter(s)',
            errors: [],
          };
          err.validationErrors.body.map((error: any) => {
            errorMessage.errors.push(error);
          });
          res.status(422).json(errorMessage);
        } else {
          next(err);
        }
      },
    );
    this.app.use(
      '/api-docs',
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument),
    );
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`API: http://${this.ipAddress}:${this.port}/api`);
      console.log(`API Docs: http://${this.ipAddress}:${this.port}/api-docs`);
    });
  }
}
