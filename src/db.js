//IMPORTS
require('dotenv').config();
const {DB_USER, DB_HOST, DB_PASSWORD, DB} = process.env;
const { Sequelize } = require('sequelize');
//MODELS
const PuntosModel = require('./models/points.js');
const UsuarioModel = require('./models/users.js');

//CONN DB POSTGRESQL
const database = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB}`, {
    logging : false,
    native:false
});

//INJECT MODELS TO DB
PuntosModel(database);
UsuarioModel(database);

//RELATIONS MODELS
const { Puntos, Usuario } = database.models;

// // RELATIONS TASK & USER
Usuario.hasMany(Puntos);
Puntos.belongsTo(Usuario);

module.exports = {
    ...database.models, 
    database
};