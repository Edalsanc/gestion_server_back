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
exports.signupController = void 0;
const conection_db_1 = __importDefault(require("../conection-db"));
const encrypt_1 = require("../libs/encrypt");
class SignupController {
    constructor() { }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = {};
            try {
                const user = yield conection_db_1.default.query("select * from user ");
                console.log(user);
                res.status(200).json(user);
            }
            catch (error) {
                res.status(500).json(error);
                console.log(error);
            }
        });
    }
    /**
     * Registro de usuario
     * @param req
     * @param res
     * @returns
     */
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let encrypt = new encrypt_1.Encrypt();
            const user = req.body;
            // let {user} = req.body;
            console.log(user);
            try {
                const password = yield encrypt.encrypt(user.clave);
                user.clave = password;
                console.log(user.clave, 'esta es la contraseña');
                console.log(password, ' Encriptada');
                //let modelo = {user}
                yield conection_db_1.default.query('INSERT usuario set ?', [user]);
                res.json({ message: 'Registro correcto', status: 200 });
            }
            catch (err) {
                console.log('Error', err);
                res.json({ message: 'No se guardaron los datos', status: 401 });
            }
        });
    }
}
exports.signupController = new SignupController();
