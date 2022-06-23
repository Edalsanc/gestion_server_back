import { Router } from 'express';
import {loginController } from '../controllers/login-controllers';
import { validacionToken } from './../middlewares/validacionToken';


class LoginRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    
    config(): void {

        //this.router.get('/',middleware,vacantesController.list );

        
        
        this.router.get('/',loginController.list );
       this.router.post('/',validacionToken.verifyToken,loginController.test);
       
        
    }

}

const loginRoutes = new LoginRoutes();

export default loginRoutes.router;