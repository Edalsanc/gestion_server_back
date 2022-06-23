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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleDriveService = void 0;
const fs_1 = __importDefault(require("fs"));
const googleapis_1 = require("googleapis");
const stream_1 = require("stream");
const uuid_1 = require("uuid");
// service account key file from Google Cloud console.
const KEYFILEPATH = 'C:\\ServiceAccountCred.json';
class GoogleDriveService {
    constructor() { }
    static bufferToStream(buffer) {
        const stream = new stream_1.Readable();
        stream.push(buffer);
        stream.push(null);
        return stream;
    }
}
exports.GoogleDriveService = GoogleDriveService;
_a = GoogleDriveService;
GoogleDriveService.getAuth = () => {
    const auth = new googleapis_1.google.auth.GoogleAuth({
        keyFile: `${__dirname}/../../service-account.json`,
        scopes: "https://www.googleapis.com/auth/drive",
    });
    return auth;
};
GoogleDriveService.getDriveService = () => {
    const auth = GoogleDriveService.getAuth();
    return googleapis_1.google.drive({ version: 'v3', auth });
};
GoogleDriveService.authenticateGoogle = () => {
    const auth = new googleapis_1.google.auth.GoogleAuth({
        keyFile: `${KEYFILEPATH}`,
        scopes: "https://www.googleapis.com/auth/drive",
    });
    googleapis_1.google.options({ auth });
    return auth;
};
GoogleDriveService.uploadToGoogleDrive = (file, carpeta) => __awaiter(void 0, void 0, void 0, function* () {
    //Se obtiene la autenticación
    const auth = GoogleDriveService.getAuth();
    console.log('nombre de la carpeta en el service', file);
    const fieldname = file.fieldname;
    console.log(fieldname, 'Este es el nopbre');
    if (fieldname == 'fileHv') {
        console.log('Ingreso pv');
        var fileMetadata = {
            //Se agrega nombre a el archivo
            name: (0, uuid_1.v4)() + "_" + file.originalname,
            //Se agraga el id de la ruta en el drive
            parents: ["17AnQ8bbdXewaG-FIUw_clh2QhyrVAs_0"], // Change it according to your desired parent folder id
        };
    }
    else {
        fileMetadata = {
            //Se agrega nombre a el archivo
            name: (0, uuid_1.v4)() + "_" + file.originalname,
            //Se agraga el id de la ruta en el drive
            parents: ["1P3hxSMcSds2_bXZPD2EdPO9qILIyfLGA"], // Change it according to your desired parent folder id
        };
    }
    const media = {
        mimeType: file.mimetype,
        // body: fs.createReadStream(file.path),
        body: GoogleDriveService.bufferToStream(file.buffer)
    };
    //Se crea el servicio de drive
    const driveService = googleapis_1.google.drive({ version: "v3", auth });
    const response = yield driveService.files.create({
        requestBody: fileMetadata,
        media: media,
        fields: "id",
    });
    yield _a.getFilesList(fileMetadata.name);
    console.log('este es el valor de url', _a.urlDrive);
    return _a.urlDrive;
});
//Eliminar archivos
GoogleDriveService.deleteFile = (filePath) => {
    fs_1.default.unlink(filePath, () => {
        console.log('file deleted');
    });
};
//Obtener archivos
GoogleDriveService.getFilesList = (nombre) => __awaiter(void 0, void 0, void 0, function* () {
    const driveService = GoogleDriveService.getDriveService();
    const response = yield driveService.files.list({
        pageSize: 3
    });
    let arrayDoc = [];
    arrayDoc = response.data.files;
    yield arrayDoc.forEach((element) => {
        if (element.name == nombre) {
            _a.urlDrive = `https://drive.google.com/file/d/${element.id}/view?usp=sharing`;
        }
    });
});
