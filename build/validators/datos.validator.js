"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class ValidationsData {
    validacionCrear() {
        const validateCreate = [
            (0, express_validator_1.check)('nombre')
                .exists()
                .not()
                .isEmpty(),
            (0, express_validator_1.check)('apellido')
                .exists()
                .not()
                .isEmpty()
        ];
    }
}
