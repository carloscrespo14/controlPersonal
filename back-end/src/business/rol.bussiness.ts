import * as crypto from 'crypto';
import { getConnection, InsertResult } from 'typeorm';
import { Rol } from '../bd/models/rol';

export class RolBusiness {

    nuevoRol(rol: Rol[]) {
        return new Promise<Rol[]>(async (resolve, reject) => {
            const connection = getConnection();
            await connection.transaction(async (manager) => {
                const rolRepository = await manager.getRepository(Rol);
                rolRepository.save(rol).then(
                    (res) => {
                        resolve(res);
                    },
                    (error) => {
                        reject(error);
                    },
                );
            });
        });
    }

    roles() {
        return new Promise<Rol[]>(async (resolve, reject) => {
            const connection = getConnection();
            await connection.manager.find(Rol).then(
                (res) => {
                    resolve(res);
                },
                (error) => {
                    reject(error);
                },
            );
        });
    }

}
