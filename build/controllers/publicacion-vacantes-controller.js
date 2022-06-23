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
exports.vacantesController = void 0;
const conection_db_1 = __importDefault(require("../conection-db"));
const model = [];
class VacantesController {
    constructor() {
        this.experiencia = [];
        this.exper = {};
    }
    /**
     * Lista la informacion de las vacantes con estado A
     * @param req
     * @param res
     */
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = yield conection_db_1.default.query('SELECT a.reqpersonal_id as id,a.nombre as nombreVacante,a.imagen,a.cantidad as c_vacantes,a.proposito,a.horario,a.descripcion,b.ciudad_nom as ciudad , c.descripcion as area, d.descripcion as tipo_de_contrato FROM vacante_publicacion a LEFT JOIN ciudad b ON a.ciudad_id = b.ciudad_id LEFT JOIN proceso c ON a.area_id = c.proceso_id LEFT JOIN clasificador d ON a.tipocontrato_id = d.clasificador_id WHERE a.estado = "A"');
                for (let i = 0; i < sql.length; i++) {
                    const beneficio = yield conection_db_1.default.query('SELECT a.descripcion FROM vacante_beneficio a WHERE vacantepub_id = ?', [sql[i].id]);
                    const responsabilidad = yield conection_db_1.default.query('SELECT a.descripcion FROM vacante_responsabilidad a WHERE vacantepub_id = ?', [sql[i].id]);
                    const conocimiento = yield conection_db_1.default.query('SELECT a.descripcion FROM vacante_conocimiento a WHERE vacantepub_id = ?', [sql[i].id]);
                    sql[i].beneficios = beneficio;
                    sql[i].responsabilidades = responsabilidad;
                    sql[i].conocimientos = conocimiento;
                }
                res.status(200).json(sql);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const sql = yield conection_db_1.default.query('SELECT * FROM vacantes WHERE id = ?', [id]);
            if (sql.length > 0) {
                return res.json(sql[0]);
            }
            res.status(404).json({ 'message': "The vacante doesn't exists" });
            console.log(sql);
        });
    }
    /**
     * Guarda los datos del formulario de las vacantes
     * @param req ontienes los datos de la perticion post
     * @param res responde el mensaje de la petición post
     */
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const registroInicial = req.body.registroIni;
            const registroExperiencia = req.body.experiencia;
            const registroFormacion = req.body.formacion;
            try {
                //Paso 1
                //Esta funcion se debe ejecutar de primero, guarda el registro datos iniciales
                const registro = yield conection_db_1.default.query('INSERT INTO vacante_hv set ?', [registroInicial]);
                const insertId = registro.insertId;
                console.log(insertId, ' Este es el insert id');
                //Actualizamos el valor de ciudad_id por el id correspondiente en la base de datos
                for (let i = 0; i < registroExperiencia.length; i++) {
                    registroExperiencia[i].vacantehv_id = insertId;
                    console.log(registroExperiencia[i].vacantehv_id, ' vacante_hv');
                    let ciudad = registroExperiencia[i].ciudad_id.split('-');
                    console.log('ciudad', ciudad);
                    const ciudadId = yield conection_db_1.default.query('SELECT a.ciudad_id FROM ciudad a WHERE a.ciudad_nom = ? LIMIT 1', [ciudad[0]]);
                    registroExperiencia[i].ciudad_id = ciudadId[0].ciudad_id;
                    console.log('vacante id', registroExperiencia[i].vacantehv_id);
                    console.log(' Final array ', registroExperiencia);
                }
                //Paso 2
                //Guarda el registro Experiencia
                yield registroExperiencia.forEach((element) => {
                    conection_db_1.default.query('INSERT INTO vacante_hv_experiencia set ?', [element]);
                    console.log('Terminó la consulta');
                });
                console.log(registroFormacion, ' este es el reg');
                //Actualizamos el valor de ciudad_id por el id correspondiente en la base de datos
                for (let i = 0; i < registroFormacion.length; i++) {
                    registroFormacion[i].vacantehv_id = insertId;
                    console.log(registroFormacion[i].vacantehv_id, ' vacante_hv');
                    let nivel = registroFormacion[i].nivel_id;
                    const nivelId = yield conection_db_1.default.query('SELECT a.clasificador_id FROM clasificador a WHERE a.descripcion = ? LIMIT 1', [nivel]);
                    registroFormacion[i].nivel_id = nivelId[0].clasificador_id;
                    console.log('nivel id', registroFormacion[i].nivel_id);
                    let estado = registroFormacion[i].estado_id;
                    const estadoId = yield conection_db_1.default.query('SELECT a.clasificador_id FROM clasificador a WHERE a.descripcion = ? LIMIT 1', [estado]);
                    registroFormacion[i].estado_id = estadoId[0].clasificador_id;
                    console.log('estado id', registroFormacion[i].estado_id);
                    console.log('esto es el registro form', registroFormacion);
                }
                //Paso 3
                //Guarda el registro Formación
                yield registroFormacion.forEach((element) => {
                    conection_db_1.default.query('INSERT INTO vacante_hv_formacion set ?', [element]);
                });
                res.json({ message: 'Vacante guardada' });
            }
            catch (err) {
                console.log('Error ', err);
            }
        });
    }
    /**
     * Actualiza los datos
     * @param req
     * @param res
     */
    update(req, res) {
        const { id } = req.params;
        conection_db_1.default.query('UPDATE games SET ? WHERE id = ?', [req.body, id]);
        res.json({ text: 'updating a game ' + [id] });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield conection_db_1.default.query('DELETE FROM games WHERE id = ?', [id]);
            res.json({ message: 'delete a game ' + req.params.id });
        });
    }
}
exports.vacantesController = new VacantesController();
