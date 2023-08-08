//IMPORTS
require('dotenv').config();
const {DB_USER, DB_HOST, DB_PASSWORD, DB} = process.env;
const { Sequelize } = require('sequelize');
//MODELS
const SalesModel = require('./models/sales.js');
const EmployeModel = require('./models/employes.js');

//CONN DB POSTGRESQL
const database = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB}`, {
    logging : false,
    native:false
});

//INJECT MODELS TO DB
SalesModel(database);
EmployeModel(database);
// ClientModel(database);

//RELATIONS MODELS
const { Ventas, Empleados } = database.models;

// // RELATIONS TASK & USER
Empleados.hasMany(Ventas);
Ventas.belongsTo(Empleados);

module.exports = {
    ...database.models, 
    database
};