//DEPENDENCIES
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
//MODELS
const { Puntos, Usuario } = require('../db');

//--------------------------------------------------------------

const sanitizeRes = async (data) => {
    const parse = JSON.stringify(data)
    return JSON.parse(parse)
}

const getDB = async (model) => {
    switch (model) {
        case Usuario:
            const users = await Usuario.findAll({where: { deleted: false }, attributes: ["id", "nombre_usuario", "email", "password", "token"]});
            if(!users[0]){
                throw new Error('Ningun empleado registrado');
            };
            return sanitizeRes(users);
        default:
            break;
    }
};

const addDB = async (model, nameUser, email, password) => {
    switch (model) {
        case Usuario:
            try {
                const userCreated =  await  Usuario.create({
                                                "nombre_usuario": nameUser,
                                                email: email,
                                                password: password
                                            });
                return sanitizeRes(userCreated)
            } catch (error) {
                throw error
            }

        default:
            break;
    }
}

module.exports = { getDB, addDB };