"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vacante_experiencia_controller_1 = require("../controllers/vacante-experiencia-controller");
class ExperienciaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', vacante_experiencia_controller_1.experienciaController.list);
        this.router.get('/:id', vacante_experiencia_controller_1.experienciaController.getOne);
        this.router.post('/', vacante_experiencia_controller_1.experienciaController.create);
        this.router.put('/:id', vacante_experiencia_controller_1.experienciaController.update);
        this.router.delete('/:id', vacante_experiencia_controller_1.experienciaController.delete);
    }
}
const experienciaRoutes = new ExperienciaRoutes();
exports.default = experienciaRoutes.router;
