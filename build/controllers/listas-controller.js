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
exports.listasController = void 0;
const conection_db_1 = __importDefault(require("../conection-db"));
class ListasController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = {};
            try {
                const ciudad = yield conection_db_1.default.query("select a.ciudad_id,concat(a.ciudad_nom,' - ',b.depto_nom) ciudad from ciudad a inner join departamento b on a.depto_id=b.depto_id where b.pais_id=1 order by ciudad");
                const nivel = yield conection_db_1.default.query("select clasificador_id,descripcion from clasificador where tipo='NEST' order by descripcion");
                const estado = yield conection_db_1.default.query("select clasificador_id,descripcion from clasificador where tipo='EACT' order by descripcion");
                const medio = yield conection_db_1.default.query("select clasificador_id,descripcion from clasificador where tipo='AREA' order by descripcion");
                sql.ciudad = ciudad;
                sql.nivel = nivel;
                sql.estado = estado;
                sql.medio = medio;
                res.status(200).json(sql);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let element = req.body;
            console.log('Estos son los datos  ', req.body);
            yield conection_db_1.default.query('INSERT INTO pruebas set ?', [element]);
            res.json({ mensaje: 'mensaje recivido' });
        });
    }
}
exports.listasController = new ListasController();
