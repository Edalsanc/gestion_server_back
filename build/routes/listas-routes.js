"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const listas_controller_1 = require("../controllers/listas-controller");
class ListasRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //this.router.get('/',middleware,vacantesController.list );
        /**
* Post track
* @openapi
* /api/listas:
*    get:
*      tags:
*        - listas
*      summary: "Listas desplegables"
*      description: Este endpoint es para listar los datos del front
*      requestBody:
*          content:
*            application/json:
*              schema:
*                $ref: "#/components/schemas/user"
*      responses:
*        '200':
*          description: Retorna el listado de datos iniciales.
*        '422':
*          description: Error de validacion.
*      security:
*       - ffofofof: []
*/
        this.router.get('/', listas_controller_1.listasController.list);
        this.router.post('/', listas_controller_1.listasController.create);
    }
}
const listasRoutes = new ListasRoutes();
exports.default = listasRoutes.router;
