"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_controllers_1 = require("../controllers/login-controllers");
const validacionToken_1 = require("./../middlewares/validacionToken");
class LoginRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //this.router.get('/',middleware,vacantesController.list );
        this.router.get('/', login_controllers_1.loginController.list);
        this.router.post('/', validacionToken_1.validacionToken.verifyToken, login_controllers_1.loginController.test);
    }
}
const loginRoutes = new LoginRoutes();
exports.default = loginRoutes.router;
