//IMPORTS
require('dotenv').config();
const {DB_USER, DB_HOST, DB_PASSWORD, DB} = process.env;
const { Sequelize } = require('sequelize');
//MODELS
const TaskModel = require('./models/tasks.js');
const UserModel = require('./models/User.js');

//CONN DB POSTGRESQL
const database = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB}`, {
    logging : false,
    native:false
});

//INJECT MODELS TO DB
TaskModel(database);
UserModel(database);
// ClientModel(database);

//RELATIONS MODELS
const { Tarea, Usuario } = database.models;

// // RELATIONS TASK & USER
Usuario.hasMany(Tarea);
Tarea.belongsTo(Usuario);

module.exports = {
    ...database.models, 
    database
};