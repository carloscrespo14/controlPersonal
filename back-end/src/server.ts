import dotenv from 'dotenv';
import { App } from './app';
import { RolController, SeguridadController } from './controllers';

dotenv.config();

const port = Number(process.env.SERVER_PORT);

const app = new App([
    new SeguridadController(),
    new RolController(),
], port);

const server = app.listen();

export default server;
