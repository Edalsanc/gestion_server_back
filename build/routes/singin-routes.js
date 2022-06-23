"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const singin_controllers_1 = require("../controllers/singin-controllers");
class SinginRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //this.router.get('/',middleware,vacantesController.list );
        this.router.get('/', singin_controllers_1.singinController.list);
        this.router.post('/', singin_controllers_1.singinController.singin);
    }
}
const singinRoutes = new SinginRoutes();
exports.default = singinRoutes.router;
