//DEPENDENCIES
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
//SERVICES
const { getDB, createToken, addDB } = require('../services/index');
//MODELS
const { Usuario } = require('../db');


//GETS-------------------------
const getUsersDB = async (req, res) => {
    try {
        const resDB = await getDB(Usuario)
        res.status(200).send({
            titulo: 'Todos los usuarios',
            message: resDB

        })
    } catch (error) {
        res.status(404).send({
            titulo: 'ERROR',
            message: error.message
        });
    };
};

const loginUser = async (req, res) => {

    try {

        const { nameUser, pass } = req.body
        const users = await getDB(Usuario)

        for (let i = 0; i < users.length; i++) {
            if (users[i]["nombre_usuario"] === nameUser) {

                bcrypt.compare(pass, users[i]["password"], function (err, pas) {
                    if (pas) {

                        const token = createToken({ username: nameUser });
                        res.json({
                            message: "Usuario Encontrado",
                            data: token
                        })
                        return;

                    } else {

                        res.status(400).send({
                            ERROR: "Error de contraseña",
                            message: "Contraseña Invalida"
                        });
                        return;

                    }

                });
                return
            }
        }

        res.status(404).send({
            ERROR: "Error",
            message: "Usuario no encontrado"
        });

    } catch (error) {
        res.status(404).send({
            titulo: 'ERROR',
            message: error.message
        });
    }
}

//POST-----------------------------------

const addUsersDB = async (req, res) => {
    if (req.body.hasOwnProperty("nameUser") && req.body.hasOwnProperty("email") && req.body.hasOwnProperty("password")) {
        console.log(req.body)
        try {
            const { nameUser, email, password } = req.body
            const resDB = await addDB(nameUser, email, password)

            const token = createToken({ username: req.body.nameUser });
            res.json(resDB);

        } catch (error) {
            res.status(409).send({
                titulo: 'ERROR',
                message: error.message
            });
        }
    } else {
        res.status(404).send({
            titulo: 'ERROR',
            message: 'Missing inf'
        })
    }
}


module.exports = {
    getUsersDB,
    loginUser,
    addUsersDB
};