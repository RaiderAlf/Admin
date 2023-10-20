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
    if (req.body.hasOwnProperty("email") && req.body.hasOwnProperty("pass")) {
        try {
            const { email, pass } = req.body
            const users = await getDB(Usuario)

            for (let i = 0; i < users.length; i++) {
                if (users[i]["email"] === email) {

                    bcrypt.compare(pass, users[i]["password"], function (err, pas) {
                        if (pas) {

                            const token = createToken({ username: email });
                            res.json({
                                message: "Usuario Encontrado",
                                data: token,
                                user: users[i].id
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
        return;
    } else {
        res.status(400).send({
            ERROR: "ERROR",
            message: "Missing Data"
        })
    }
}

//POST-----------------------------------

const addUsersDB = async (req, res) => {
    if (req.body.hasOwnProperty("nameUser") && req.body.hasOwnProperty("email") && req.body.hasOwnProperty("pass")) {
        console.log(req.body)
        try {
            const { nameUser, email, pass } = req.body
            const resDB = await addDB(nameUser, email, pass)

            const token = createToken({ username: req.body.nameUser });
            res.status(201).send({
                message: "Usuario Creado",
                data: token,
                user: resDB.id
            });

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