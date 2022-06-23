import Multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path'



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



export default class MulterFile {

    static getInstance = () => {
        const multer = Multer({
            storage: Multer.memoryStorage()
        });

        return multer;

    }
}




