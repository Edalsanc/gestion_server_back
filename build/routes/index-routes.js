"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_controllers_1 = require("../controllers/index-controllers");
class IndexRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', index_controllers_1.indexController.index);
        this.router.post('/', index_controllers_1.indexController.signup);
        this.router.post('/', index_controllers_1.indexController.signin);
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
