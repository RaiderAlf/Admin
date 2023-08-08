//DEPENDENCIES
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
//MODELS
const { Ventas, Empleados } = require('../db');

//--------------------------------------------------------------

const sanitizeRes = async (data) => {
    const parse = JSON.stringify(data)
    return JSON.parse(parse)
}

const usuariosDB = async () => {
    const users = await Empleados.findAll({where: { deleted: false }, attributes: ["id", "nombre_usuario", "email", "password", "token"]});
    if(!users[0]){
        throw new Error('Ningun empleado registrado');
    };
    return sanitizeRes(users);
};

const tareasDB = async (id) => {
    const tasks = await Ventas.findAll({where: { UsuarioId: id, deleted: false }, attributes: ["id", "titulo", "descripcion", "completada"]});
    if(!tasks[0]){
        throw new Error('No hay tareas creadas');
    };
    return tasks;
};

const loginDB = async (email, password) => {
    if(email){
        const userDB = await Empleados.findOne({where: { email: email, deleted: false}, attributes: ["id", "nombre_usuario", "email", "password"]});

        if(userDB !== null){
            const user = userDB.toJSON()
            return new Promise((resolve, reject) => {
                bcrypt.compare(password, user.password, async (err, result) => {
                    if (result === false) {

                        return reject('Pass wrong');
                    } else {
                        const payload = { usuarioId: user.id };
                        const tokenUser = jwt.sign(payload, 'secreto', { expiresIn: '1h' });
                        await Usuario.update({ token: tokenUser }, { where: { id_usuario: user.id_usuario }});
                        return resolve(tokenUser)
                    };
                });
            });
        };
        throw new Error('Usuario no registrado');
    };
    throw new Error('Email no enviado');
};

const registryUsersDB = async (usuario, email, password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, async (err, hash) => {
            if (err) {
                return reject('error');
            } else {
                return resolve(
                        await Usuario.create({nombre_usuario: usuario, email, password : hash})
                    );
            };
        });
    });
};

const aggTaskDB = async (titulo, descripcion, id) => {
   return await Ventas.create({titulo, descripcion, UsuarioId : id });
};

const updateTask = async (idUsuario, idTarea) => {
    return await Ventas.update({completada: true}, {where: {UsuarioId: idUsuario, id: idTarea}} )
}

module.exports = { usuariosDB, tareasDB, loginDB, registryUsersDB, aggTaskDB, updateTask };