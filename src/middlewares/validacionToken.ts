
import { Request, Response, NextFunction } from 'express';
import jwt, { verify } from 'jsonwebtoken'
import db from '../conection-db'


class ValidacionToken {


    public  verifyToken(req: Request, res: Response, next: NextFunction) {
        console.log('ingreso 1')
        if (!req.headers.authorization) return res.status(401).json('No autorizado');
        console.log('ingreso 2')
        const token = req.headers.authorization.substring(7);
        console.log('Este es el token nn ',token)
        if (token !== '') {
            const content = jwt.verify(token, 'secret');
            console.log('Este es el contenido ', content)
           // const {userName} = content;
            req.body = content;
           //res.json(content) ;
            next();
        } else {
            res.status(401).json('Token vacio');
        }
    }


}

export const validacionToken = new ValidacionToken();