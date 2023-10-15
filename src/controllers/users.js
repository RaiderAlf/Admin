//DEPENDENCIES
const jwt = require('jsonwebtoken');
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
        const test = req.body.test

        const token = createToken({ username: req.body.nameUser });
        res.json(token);

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
            res.json(token);

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