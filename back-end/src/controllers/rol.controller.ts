import express = require('express');
import { Validator } from 'express-json-validator-middleware';
import { RolBusiness } from '../business/rol.bussiness';
import { checkJwt } from '../middlewares/checkJwt';
import { BaseController } from './base.controller';
import { IController } from './controller.interface';

export class RolController extends BaseController implements IController {
  basePath = '/seguridad';
  router = express.Router();

  constructor() {
    super();
    this.initRoutes();
  }

  initRoutes() {
    this.router.post(
        `${this.basePath}/rol/registro`, [checkJwt],
        this.nuevoRol.bind(this),
    );
    this.router.get(
        `${this.basePath}/rol/roles`, [checkJwt],
        this.traerRoles.bind(this),
    );

  }

  private nuevoRol(request: express.Request, response: express.Response) {
    const rolBussiness = new RolBusiness();
    rolBussiness.nuevoRol(request.body).then(
        (res) => {
            response.status(200).send(res);
        },
        (error) => {
            response.status(500).send(error);
        },
    );
  }

  private traerRoles(request: express.Request, response: express.Response) {
      const rolBussiness = new RolBusiness();
      rolBussiness.roles().then(
          (res) => {
              response.status(200).send(res);
          },
          (error) => {
              response.status(500).send(error);
          },
      );
  }
}
