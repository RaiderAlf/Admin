//SERVICES
const { getDB, addPointsDB } = require('../services/index');
//MODELS
const { Puntos } = require('../db');


//GETS-------------------------
const getPointsDB = async (req, res) => {
    if (req.body.hasOwnProperty("userId")) {
        try {
            const { userId } = req.body
            const resDB = await getDB(Puntos, userId)
            res.status(200).send({
                titulo: 'Todos los registros',
                message : resDB
                
            })
        } catch (error) {
            res.status(200).send({
                titulo : 'ERROR',
                message: error.message
            });
        };
        return;
    }
    
    res.status(401).send({
        titulo : 'ERROR',
        message : 'Missing inf'
    })
};

//POST-----------------------------------------
const addPoints = async (req, res) => {
    if (req.body.hasOwnProperty("amount") && req.body.hasOwnProperty("userId")) {
        console.log(req.body)
        try {
            const { amount, userId } = req.body
            const resDB = await addPointsDB( amount, userId )
            res.status(201).send({
                titulo: "Registro Agregado Correctamente",
                message : resDB
            })
        } catch (error) {
            res.status(409).send({
                titulo : 'ERROR',
                message: error.message
            });
        }
        return;
    }

    res.status(404).send({
        titulo : 'ERROR',
        message : 'Missing inf'
    })
}

module.exports = { getPointsDB, addPoints }