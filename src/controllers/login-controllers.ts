import { Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import db from '../conection-db'
import {GeneralData} from '../config/general-data';

class LoginController {

   


         test(req: Request, res: Response){
             let cp = req.body.user;
             console.log(cp[0].userName,' Este es el contenido del array')
             res.json(req.body)
         }


}


export const loginController = new LoginController();