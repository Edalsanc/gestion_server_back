import express, { Application } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import swaggerUi from "swagger-ui-express";
import swaggerSetup from "./docs/swagger";


import loginRoutes from './routes/login-routes';
import signinRoutes from './routes/signin-routes';
import signupRoutes from './routes/signup-routes';


//Inicializamos las variables de entorno .env
dotenv.config();
console.log(process.env.TESTING)
class Server {


    public app: Application;
    constructor() {
    
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {

        // Middlewares
        this.app.set('port', process.env.PORT || 3004);
        //Morgan se utiliza para ver detalles y logs de cada peticion
        this.app.use(morgan('dev'));
        //Cors se utiliza para recivir peticiones desde otros dominios
        this.app.use(cors());
        //Express.json es una funcion que ya trae la ultima version de express, antes se hacia con bodyparser
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:false}))
        

    }


    routes(): void {
       
        this.app.use('/api/login',loginRoutes)
        this.app.use('/api/signin',signinRoutes)
        this.app.use('/api/signup',signupRoutes)
        this.app.use('/documentacion',swaggerUi.serve, swaggerUi.setup(swaggerSetup))
    }

    start(): void {
        this.app.listen(this.app.get('port'), () =>{
            console.log(`Server on port `,this.app.get('port'));
        });
    }
}

const server = new Server();
server.start();


