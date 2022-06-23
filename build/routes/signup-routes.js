"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signup_controllers_1 = require("../controllers/signup-controllers");
class SignupRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //this.router.get('/',middleware,vacantesController.list );
        this.router.get('/', signup_controllers_1.signupController.list);
        this.router.post('/', signup_controllers_1.signupController.signup);
    }
}
const signupRoutes = new SignupRoutes();
exports.default = signupRoutes.router;
