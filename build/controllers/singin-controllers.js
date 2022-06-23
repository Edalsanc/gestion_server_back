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
exports.singinController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const conection_db_1 = __importDefault(require("../conection-db"));
const general_data_1 = require("../config/general-data");
class SinginController {
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
    singin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userName, pass } = req.body;
            yield conection_db_1.default.query('select a.userName,a.roleId from user a where userName = ? and pass = ?', [userName, pass]).then(user => {
                if (user.length === 0) {
                    console.log('Esta vacio');
                    console.log(user);
                    return res.json({ message: 'Usuario o contraseña incorrecto', status: 401 });
                }
                else {
                    console.log(user[0].userName);
                    console.log('Ingresó en el esle');
                    //const newToken = jwt.sign({ userId, username }, config.jwtSecret, { expiresIn: '1h' });
                    /**Recive un dato tipo object, clave secreta y tiempo que expira */
                    const token = jsonwebtoken_1.default.sign({ user }, process.env.TOKEN_SECRET || general_data_1.GeneralData.SECRET, { expiresIn: 120 });
                    return res.json({ token, message: 'Mensaje valido', status: 200 });
                }
            }).catch(err => {
                console.log('Este es el error');
                console.log(err);
            });
            console.log('Termino la consulta');
        });
    }
}
exports.singinController = new SinginController();
