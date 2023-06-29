//MODELS
const { Tarea, Usuario } = require('../db');

const userTokenPass = () => {
    return async(req, res, next) => {
            if(req.headers.authorization){
                const authHeader = req.headers.authorization
                const token = authHeader.split(' ')[1];
                return next()
            }
        return res.status(401).send({
            Error: 'ERROR',
            Message: 'AUTH INVALID'
        })
    }
};

module.exports = {userTokenPass}