"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vacante_formacion_controller_1 = require("../controllers/vacante-formacion-controller");
class FormacionRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', vacante_formacion_controller_1.formacionController.list);
        this.router.get('/:id', vacante_formacion_controller_1.formacionController.getOne);
        this.router.post('/', vacante_formacion_controller_1.formacionController.create);
        this.router.put('/:id', vacante_formacion_controller_1.formacionController.update);
        this.router.delete('/:id', vacante_formacion_controller_1.formacionController.delete);
    }
}
const formacionRoutes = new FormacionRoutes();
exports.default = formacionRoutes.router;
