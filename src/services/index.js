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

const cryptPass = async (pass, saltRounds = 10) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds)
        return await bcrypt.hash(pass, salt)
    } catch (error) {
        console.log(error)
    }
    return null
}

const createToken = (username) => {
    return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '86400s' });
}

const getDB = async (model, userid) => {
    switch (model) {
        case Usuario:
            const users = await Usuario.findAll({ where: { deleted: false }, attributes: ["id", "nombre_usuario", "email", "password", "token"] });
            if (!users[0]) {
                throw new Error('Ningun usuario registrado');
            };
            return sanitizeRes(users);

        case Puntos:
            const points = await Puntos.findAll({ where: { UsuarioId: userid, deleted: false }, attributes: ["id", "monto", "fecha"] });
            if (!points[0]) {
                throw new Error('No tiene registros');
            };
            return sanitizeRes(points);
    }
};

const addDB = async (nameUser, email, password) => {
    try {
        const passHash = await cryptPass(password)

        const userCreated = await Usuario.create({
            "nombre_usuario": nameUser,
            email: email,
            password: passHash
        });
        return sanitizeRes(userCreated)
    } catch (error) {
        throw error
    }
}

const addPointsDB = async (amount, userId) => {
    try {
        const localDate = new Date()
        const fecha = localDate.toLocaleDateString()
        const pointCreated = await Puntos.create({
            fecha: fecha,
            monto: amount,
            UsuarioId: userId
        });
        console.log(pointCreated)
        return sanitizeRes(pointCreated)
    } catch (error) {
        throw error
    }
}

const deleteDB = async (model, id) => {
    try {
        switch (model) {
            case Usuario:
                const findUser = await Usuario.findOne({ where: { id } });

                if (!findUser) throw new Error(`No se encontró ningún registro con el id ${id}`);

                return await Usuario.update({ deleted: true }, { where: { id: id } })

            case Puntos:
                const findPuntos = await Puntos.findPuntosOne({ where: { id } });

                if (!findPuntos) throw new Error(`No se encontró ningún registro con el id ${id}`);

                return await Puntos.update({ deleted: true }, { where: { id: id } })
        }
    } catch (error) {
        throw error
    }
}

module.exports = { getDB, createToken, cryptPass, addDB, addPointsDB, deleteDB };