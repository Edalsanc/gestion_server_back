"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
/*
//Guardar archivos localmente
const storage = Multer.diskStorage({
    //Carpeta de destino
     destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname))
    }

});

export default Multer({ storage });
*/
class MulterFile {
}
exports.default = MulterFile;
MulterFile.getInstance = () => {
    const multer = (0, multer_1.default)({
        storage: multer_1.default.memoryStorage()
    });
    return multer;
};
