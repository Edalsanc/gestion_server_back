import mysql from 'promise-mysql';
import keys from './config/keys';



const db = mysql.createPool(keys.database);

db.getConnection()
.then(connection => {
    db.releaseConnection(connection);
    console.log('BD conectada');
}).catch(err =>{

    console.log('no hubo conexión a la BD')
    //console.warn(err);

});





export default db;