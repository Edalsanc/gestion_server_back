"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ciudades_controller_1 = require("../controllers/ciudades-controller");
class CiudadesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //this.router.get('/',middleware,vacantesController.list );
        this.router.get('/', ciudades_controller_1.ciudadesController.list);
    }
}
const ciudadesRoutes = new CiudadesRoutes();
exports.default = ciudadesRoutes.router;
