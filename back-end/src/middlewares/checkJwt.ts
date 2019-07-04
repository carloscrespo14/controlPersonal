import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
dotenv.config();

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    let authHeader = '';

    if (req.headers['authorization'] as string == undefined) {
        return res.status(401).send('Se requiere header [\'Authorization\']: Bearer token');
    } else {
        authHeader = req.headers['authorization'] as string;
        const tokenArray = authHeader.split(' ');

        if (tokenArray.length != 2 || tokenArray[0].toUpperCase() != 'BEARER') {
            res.status(401).send('Se requiere header [\'Authorization\']: Bearer token');
        }

        const token = tokenArray[1];
        const secretKey = 'deberiavenirdeunaarchivoenv';
        let jwtPayload;
        try {
            jwtPayload = jwt.verify(token, secretKey) as any;
            res.locals.jwtPayload = jwtPayload;
        } catch (error) {
            res.status(401).send('Token inválido');
            return;
        }
        next();
    }

};
