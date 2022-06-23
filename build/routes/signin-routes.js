"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signin_controllers_1 = require("../controllers/signin-controllers");
class SigninRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
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
        this.router.post('/', signin_controllers_1.signinController.signin);
    }
}
const signinRoutes = new SigninRoutes();
exports.default = signinRoutes.router;
