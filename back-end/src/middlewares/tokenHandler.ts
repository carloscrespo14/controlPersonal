
import * as jwt from 'jsonwebtoken';
import { Seguridad } from '../bd/models/seguridad';

export class JsonWebToken {
    constructor() {}

    secretKey = 'deberiavenirdeunaarchivoenv';

    generateToken(data: Seguridad) {
        const payload = {email: data.email, userId: data.userId };
        return jwt.sign({ payload }, this.secretKey , { expiresIn: '3d' });
    }

}
