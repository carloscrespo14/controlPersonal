import express = require('express');
import { Validator } from 'express-json-validator-middleware';
import { SeguridadBusiness } from '../business/seguridad.business';
import { BaseController } from './base.controller';
import { IController } from './controller.interface';

/**
 * Controller de servicios de seguridad
 */
export class SeguridadController extends BaseController implements IController {
  basePath = '/seguridad';
  router = express.Router();

  constructor() {
    super();
    this.initRoutes();
  }

  initRoutes() {
    this.router.post(
      `${this.basePath}/usuario/registro`,
      this.registroUsuario.bind(this),
    );

    this.router.post(
      `${this.basePath}/login`,
      this.login.bind(this),
    );

    this.router.get(
      `${this.basePath}/usuario/getAll`,
      this.getAllUsuarios.bind(this),
    );
  }

  private getAllUsuarios(request: express.Request, response: express.Response) {
   response.send('hola');
  }

  private login(request: express.Request, response: express.Response) {
    const seguridadBussiness = new SeguridadBusiness();
    seguridadBussiness.login(request.body).then(
      (res) => {
        response.status(200).send(res);
      },
      (error) => {
        response.status(401).send({
          err: error,
        });
      },
    );
  }

  private registroUsuario(request: express.Request, response: express.Response) {
    const seguridadBussiness = new SeguridadBusiness();
    seguridadBussiness.registroUsuario(request.body).then(
      (res) => {
        response.status(200).send(res);
      },
      (err) => {
        response.status(500).send(err);
      },
    );
  }
}
