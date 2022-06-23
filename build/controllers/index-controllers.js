"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
const usuario_token_model_1 = require("./../models/usuario-token.model");
const conection_db_1 = __importDefault(require("../conection-db"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class IndexController {
    //sigin registro 
    index(req, res) {
        const user = new usuario_token_model_1.UsuarioToken();
        user.id = 4,
            user.nombre = req.body.nombre,
            user.correo = req.body.correo;
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.TOKEN_SECRET || 'secret');
        res.header('auth-token', token).json(user);
    }
    //sigup registro 
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new usuario_token_model_1.UsuarioToken();
            user.id = req.body.id,
                user.nombre = req.body.nombre,
                user.correo = req.body.correo;
            console.log(user);
            yield conection_db_1.default.query('INSERT INTO pruebas set ?', [user]);
            console.log(user);
            const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.TOKEN_SECRET || 'secret');
            res.header('auth-token', token).json({ mensaje: "Registrado", usuario: user });
        });
    }
    //sigup registro 
    signin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.send('login');
        });
    }
}
exports.indexController = new IndexController();
