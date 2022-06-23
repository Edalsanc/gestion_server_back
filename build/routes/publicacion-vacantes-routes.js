"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const publicacion_vacantes_controller_1 = require("../controllers/publicacion-vacantes-controller");
class VacantesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //this.router.get('/',middleware,vacantesController.list );
        this.router.get('/', publicacion_vacantes_controller_1.vacantesController.list);
        this.router.get('/:id', publicacion_vacantes_controller_1.vacantesController.getOne);
        this.router.post('/', publicacion_vacantes_controller_1.vacantesController.create);
        this.router.put('/:id', publicacion_vacantes_controller_1.vacantesController.update);
        this.router.delete('/:id', publicacion_vacantes_controller_1.vacantesController.delete);
    }
}
const vacantesRoutes = new VacantesRoutes();
exports.default = vacantesRoutes.router;
