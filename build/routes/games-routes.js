"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const registro_vacante_controller_1 = require("../controllers/registro-vacante.controller");
class GamesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', registro_vacante_controller_1.gamesController.list);
        this.router.get('/:id', registro_vacante_controller_1.gamesController.getOne);
        this.router.post('/', registro_vacante_controller_1.gamesController.create);
        this.router.put('/:id', registro_vacante_controller_1.gamesController.update);
        this.router.delete('/:id', registro_vacante_controller_1.gamesController.delete);
    }
}
const gamesRoutes = new GamesRoutes();
exports.default = gamesRoutes.router;
