
import { Request, Response, NextFunction } from 'express';
import jwt, { verify } from 'jsonwebtoken'
import db from '../conection-db'


class ValidacionToken {


    public  validacionErrors(req: Request, res: Response, next: NextFunction) {
        console.log('ingreso 1')
        if (!db.getConnection){

            return res.status(500).json({message:'No hay conexión a la base de datos'})

        }else{

            return next();
        }
        
            
       
    }


}

export const validacionToken = new ValidacionToken();