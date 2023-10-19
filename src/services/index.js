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
    return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

// bcrypt.compare(guess, stored_hash, function (err, res) {
//     if (res) {
//         // Las contraseñas coinciden
//     } else {
//         // Las contraseñas no coinciden
//     }
// });


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
        default:
            break;
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

module.exports = { getDB, createToken, cryptPass, addDB, addPointsDB };