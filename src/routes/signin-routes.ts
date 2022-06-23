import { validacionToken } from '../middlewares/validacionToken';
import { Router } from 'express';
import {signinController } from '../controllers/signin-controllers';


class SigninRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    
    config(): void {

    


         /**
 * Post track
 * @openapi
 * /api/signin/:
 *    get:
 *      tags:
 *        - signin
 *      summary: "Loguin"
 *      description: Este endpoint permite realizar el loguin 
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/user"
 *      responses:
 *        '200':
 *          description: Retorna el mensaje de loguin correcto.
 *        '422':
 *          description: Error de validacion.
 *      security:
 *       - ffofofof: []
 */
       this.router.post('/',signinController.signin);
       
        
    }

}

const signinRoutes = new SigninRoutes();

export default signinRoutes.router;