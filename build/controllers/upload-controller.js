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
exports.uploadController = void 0;
const googleDriveService_1 = require("../libs/googleDriveService");
const conection_db_1 = __importDefault(require("../conection-db"));
class UploadController {
    guardar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log(req.body, 'este es el objeto')
            const { carpeta } = req.body;
            console.log(carpeta, 'este es el objeto');
            const urlDrive = yield googleDriveService_1.GoogleDriveService.uploadToGoogleDrive(req.file, carpeta);
            //  console.log(req.file?.path,'este es el nombre path')
            console.log(urlDrive);
            res.json({
                message: urlDrive
            });
            /*
                const {title,description} = req.body;
                console.log(req.file?.path)
               
                const newPhoto = {
                    title: title,
                    description:description,
                    imagePath: req.file?.path
            
                }
            
                console.log(newPhoto)
            */
            /*
             try {
                 console.log(req.file?.path);
                 const nomArchivo = req.file?.path
                 const archivo = { nomarchivo_hv: nomArchivo }
                 await db.query('INSERT INTO vacante_hv set ?  ', [archivo]);
                 return res.json({ message: 'Upload correcto' });
             } catch (err) {
                 console.log(err)
             }
     
     */
        });
    }
    list(req, res) {
        return res.send('Listar Uploads');
    }
    update(req, res) {
        const { id } = req.params;
        conection_db_1.default.query('UPDATE vacante_hv SET ? WHERE vacante_id = ?', [req.body, id]);
        res.json({ text: 'updating a game ' + [id] });
    }
}
exports.uploadController = new UploadController();
