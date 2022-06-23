import { validacionToken } from './../middlewares/validacionToken';
import { Router } from 'express';
import {signupController } from '../controllers/signup-controllers';


class SignupRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    
    config(): void {

        //this.router.get('/',middleware,vacantesController.list );
        
        this.router.get('/',signupController.list );
       this.router.post('/',signupController.signup);
       
        
    }

}

const signupRoutes = new SignupRoutes();

export default signupRoutes.router;