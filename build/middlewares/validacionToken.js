"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validacionToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class ValidacionToken {
    verifyToken(req, res, next) {
        console.log('ingreso 1');
        if (!req.headers.authorization)
            return res.status(401).json('No autorizado');
        console.log('ingreso 2');
        const token = req.headers.authorization.substring(7);
        console.log('Este es el token nn ', token);
        if (token !== '') {
            const content = jsonwebtoken_1.default.verify(token, 'secret');
            console.log('Este es el contenido ', content);
            // const {userName} = content;
            req.body = content;
            //res.json(content) ;
            next();
        }
        else {
            res.status(401).json('Token vacio');
        }
    }
}
exports.validacionToken = new ValidacionToken();
