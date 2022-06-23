"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validacionToken = void 0;
const conection_db_1 = __importDefault(require("../conection-db"));
class ValidacionToken {
    validacionErrors(req, res, next) {
        console.log('ingreso 1');
        if (!conection_db_1.default.getConnection) {
            return res.status(500).json({ message: 'No hay conexión a la base de datos' });
        }
        else {
            return next();
        }
    }
}
exports.validacionToken = new ValidacionToken();
