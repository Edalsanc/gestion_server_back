"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_mysql_1 = __importDefault(require("promise-mysql"));
const keys_1 = __importDefault(require("./config/keys"));
const db = promise_mysql_1.default.createPool(keys_1.default.database);
db.getConnection()
    .then(connection => {
    db.releaseConnection(connection);
    console.log('BD conectada');
}).catch(err => {
    console.log('no hubo conexión a la BD');
    //console.warn(err);
});
exports.default = db;
