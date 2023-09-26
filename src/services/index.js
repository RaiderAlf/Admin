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

const getDB = async (model, userid) => {
    switch (model) {
        case Usuario:
            const users = await Usuario.findAll({where: { deleted: false }, attributes: ["id", "nombre_usuario", "email", "token"]});
            if(!users[0]){
                throw new Error('Ningun usuario registrado');
            };
            return sanitizeRes(users);

        case Puntos:
                const points = await Puntos.findAll({where: { UsuarioId: userid ,deleted: false }, attributes: ["id", "monto", "fecha"]});
                if(!points[0]){
                    throw new Error('No tiene registros');
                };
                return sanitizeRes(points);
        default:
            break;
    }
};

const addDB = async (model, nameUser, email, password, amount, userId) => {
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
        case Puntos:
            try {
                const userCreated =  await  Puntos.create({
                                                monto: amount,
                                                UsuarioId: userId
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