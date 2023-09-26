//SERVICES
const { getDB, addDB } = require('../services/index');
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
const addPointsDB = async (req, res) => {
    if (req.body.hasOwnProperty("monto") && req.body.hasOwnProperty("userId")) {
        console.log(req.body)
        try {
            const { monto, userId } = req.body
            const resDB = await addDB(Puntos, monto, userId)
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
    }else{
        res.status(404).send({
            titulo : 'ERROR',
            message : 'Missing inf'
        })
    }
}

module.exports = { getPointsDB, addPointsDB }