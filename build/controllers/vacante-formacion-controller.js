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
exports.formacionController = void 0;
const conection_db_1 = __importDefault(require("../conection-db"));
class FormacionController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = yield conection_db_1.default.query('SELECT * FROM vacante_hv_formacion');
            res.json(sql);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const sql = yield conection_db_1.default.query('SELECT * FROM vacante_hv_formacion WHERE id = ?', [id]);
            if (sql.length > 0) {
                return res.json(sql[0]);
            }
            res.status(404).json({ 'message': "The vacante doesn't exists" });
            console.log(sql);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield conection_db_1.default.query('INSERT INTO vacante_hv_formacion set ?', [req.body]);
            console.log(req.body);
            res.json({ message: 'Experiencia guardada' });
        });
    }
    update(req, res) {
        const { id } = req.params;
        conection_db_1.default.query('UPDATE vacante_hv_formacion SET ? WHERE id = ?', [req.body, id]);
        res.json({ text: 'Experiencia Actualizada ' + [id] });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield conection_db_1.default.query('DELETE FROM vacante_hv_formacion WHERE id = ?', [id]);
            res.json({ message: 'Experiencia Eliminada' + req.params.id });
        });
    }
}
exports.formacionController = new FormacionController();
