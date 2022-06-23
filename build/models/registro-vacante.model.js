"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelRegistro = void 0;
const conection_db_1 = __importDefault(require("../conection-db"));
class ModelRegistro {
    guardarExperiencia(registroExperiencia) {
        registroExperiencia.forEach((element) => {
            conection_db_1.default.query('INSERT INTO vacante_hv_experiencia set ?', [element]);
        });
    }
    guardarFormacion(registroFormacion) {
        registroFormacion.forEach((element) => {
            conection_db_1.default.query('INSERT INTO vacante_hv_formacion set ?', [element]);
        });
    }
    guardarDatosUser(registroInicial) {
        conection_db_1.default.query('INSERT INTO vacante_hv set ?', [registroInicial]);
    }
}
exports.ModelRegistro = ModelRegistro;
