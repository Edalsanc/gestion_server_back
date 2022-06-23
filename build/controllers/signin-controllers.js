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
exports.signinController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const conection_db_1 = __importDefault(require("../conection-db"));
const general_data_1 = require("../config/general-data");
const encrypt_1 = require("../libs/encrypt");
class SigninController {
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
     * Inicio de sesion
     * @param req
     * @param res
     * @returns
     */
    signin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let encrypt = new encrypt_1.Encrypt();
            var { nom_usuario, clave } = req.body;
            console.log(req.body);
            //pass = await encrypt.encrypt(pass)
            try {
                const registro = yield conection_db_1.default.query('select a.nom_usuario, a.clave from usuario a where nom_usuario = ? LIMIT 1', [nom_usuario]);
                console.log(typeof (registro));
                console.log(registro);
                if (registro == undefined || registro == null || Object.entries(registro).length === 0) {
                    console.log('vvcmcmcm');
                    return res.status(200).json({ message: 'Usuario no existe', status: 401 });
                }
                const password = registro[0].clave;
                console.log(registro[0].clave, ' password');
                //desencrypta la contraseña y devuelve un valor booleano
                const checkPass = yield encrypt.compare(clave, password);
                console.log(checkPass);
                if (checkPass) {
                    console.log('Inicio de sesion correcto');
                    const token = jsonwebtoken_1.default.sign({ registro }, process.env.TOKEN_SECRET || general_data_1.GeneralData.SECRET, { expiresIn: '3h' });
                    return res.json({ token, message: 'Inicio de sesión correcto', status: 200 });
                }
                else {
                    return res.json({ message: 'Usuario o contraseña incorrecto', status: 401 });
                }
            }
            catch (err) {
                console.log(err);
                return res.json({ message: err, status: 500 });
            }
        });
    }
}
exports.signinController = new SigninController();
function err(err) {
    throw new Error('Function not implemented.');
}
