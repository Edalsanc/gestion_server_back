import { Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import db from '../conection-db'
import { GeneralData } from '../config/general-data';
import {Encrypt} from '../libs/encrypt'

class SignupController {

    constructor(
      
    ){}


    /**
     * Registro de usuario
     * @param req 
     * @param res 
     * @returns 
     */
    async signup(req: Request, res: Response) {
        let encrypt = new Encrypt();
        const user = req.body;
        // let {user} = req.body;
        console.log(user)
        try{
        
        
        const password = await encrypt.encrypt(user.clave)
        user.clave = password;
       
        await db.query('INSERT usuario set ?', [user]);
        res.json({message:'Registro correcto',status:200});
        }catch(err){
            console.log('Error', err)
            res.json({message:'No se guardaron los datos',status:401})

        }
      
    }

}



export const signupController = new SignupController();