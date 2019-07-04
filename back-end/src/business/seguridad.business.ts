import * as crypto from 'crypto';
import { getConnection, InsertResult } from 'typeorm';
import { Seguridad } from '../bd/models/seguridad';
import { JsonWebToken } from '../middlewares/tokenHandler';

export class SeguridadBusiness {

  registroUsuario(user: Seguridad) {
    return new Promise<InsertResult>(async (resolve, reject) => {
      const connection = getConnection();
      await connection.transaction( async (manager) => {
        const userRepository = await manager.getRepository(Seguridad);
        await userRepository.insert(user).then((res) => {
          resolve(res);
        }, (err) => {reject(err.message); } );
      });
    });
  }

  registrosUsuarios() {
    return new Promise<Seguridad[]>(async (resolve, reject) => {
      const connection = getConnection();
      connection.manager.find(Seguridad).then((users: Seguridad[]) => {
        resolve(users);
      }, (error) => {
        reject(error);
      });
    });
  }

  login(loginData: Seguridad) {
    return new Promise<string>(async (resolve, reject) => {
      const connection = getConnection();
      connection.manager.findOneOrFail(Seguridad, {email: loginData.email}).then(
        (userData) => {
          if ( userData.email === loginData.password ) {
            const jsonWebToken = new JsonWebToken();
            resolve(jsonWebToken.generateToken(userData));
          } else {
            const message = 'usuario o password incorrecto';
            reject(message);
          }
        },
        (error) => {
          reject(error);
        },
      );
    });
  }

}
