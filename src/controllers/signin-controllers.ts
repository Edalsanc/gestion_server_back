import { check } from 'express-validator';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import db from '../conection-db'
import { GeneralData } from '../config/general-data';
import { Encrypt } from '../libs/encrypt'


class SigninController {

    public async list(req: Request, res: Response) {
        let sql: any = {};
        try {

            const user: any = await db.query("select * from user ");
            console.log(user)

            res.status(200).json(user);

        } catch (error) {
            res.status(500).json(error)
            console.log(error)
        }

    }

    /**
     * Inicio de sesion
     * @param req 
     * @param res 
     * @returns 
     */
    async signin(req: Request, res: Response) {

        let encrypt = new Encrypt();

        var { nom_usuario, clave } = req.body;



        //pass = await encrypt.encrypt(pass)

        try {

            const registro: any = await db.query('select a.nom_usuario, a.clave from usuario a where nom_usuario = ? LIMIT 1', [nom_usuario])




            if (registro == undefined || registro == null || Object.entries(registro).length === 0) {
                console.log('vvcmcmcm')
                return res.status(200).json({ message: 'Usuario no existe', status: 401 })
            }

            const password = registro[0].clave;



            //desencrypta la contraseña y devuelve un valor booleano
            const checkPass = await encrypt.compare(clave, password);


            if (checkPass) {

                const token: any = jwt.sign({ registro }, process.env.TOKEN_SECRET || GeneralData.SECRET, { expiresIn: '3h' });
                return res.json({ token, message: 'Inicio de sesión correcto', status: 200 });
            } else {

                return res.json({ message: 'Usuario o contraseña incorrecto', status: 401 });

            }

        } catch (err) {

            return res.json({ message: err, status: 500 });
        }

    }

}







export const signinController = new SigninController();

function err(err: any): any {
    throw new Error('Function not implemented.');
}
