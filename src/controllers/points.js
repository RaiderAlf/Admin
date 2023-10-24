//SERVICES
const { getDB, addPointsDB, deleteDB } = require('../services/index');
//MODELS
const { Puntos } = require('../db');


//GETS-------------------------
const getPointsDB = async (req, res) => {
    if (req.query.hasOwnProperty("userId")) {
        try {
            const { userId } = req.query
            const resDB = await getDB(Puntos, userId)
            res.status(200).send({
                titulo: 'Registros',
                message: resDB

            })
        } catch (error) {
            res.status(200).send({
                titulo: 'Registros',
                message: error.message
            });
        };
        return;
    }

    res.status(404).send({
        titulo: 'ERROR',
        message: 'Missing inf'
    })
};

//POST-----------------------------------------
const addPoints = async (req, res) => {
    if (req.body.hasOwnProperty("amount") && req.body.hasOwnProperty("userId")) {
        try {
            const { amount, userId } = req.body
            const resDB = await addPointsDB(amount, userId)
            res.status(201).send({
                titulo: "Registro Agregado Correctamente",
                message: resDB
            })
        } catch (error) {
            res.status(409).send({
                titulo: 'ERROR',
                message: error.message
            });
        }
        return;
    }

    res.status(404).send({
        titulo: 'ERROR',
        message: 'Missing inf'
    })
}

//DELETE-----------------------------------------
const deletePoints = async (req, res) => {
    if (req.body.hasOwnProperty('id')) {
        const { id } = req.body
        const delDB = await deleteDB(id)
        res.status(200).send({
            titulo: "registro",
            message: delDB(Puntos, id)
        })
        return
    }

    res.status(404).send({
        titulo: "ERROR",
        ERROR: "Missing ID"
    })
}

module.exports = { getPointsDB, addPoints, deletePoints }