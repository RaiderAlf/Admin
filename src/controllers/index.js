//DEPENDENCIES
const jwt = require('jsonwebtoken');
//SERVICES
const { usuariosDB, loginDB, tareasDB, registryUsersDB, aggTaskDB } = require('../services/index');

//GETS------------------------------------------------
const getUsersDB = async (req, res) => {
    try {
        res.send({
            Message: 'Todos Usuarios',
            data: await usuariosDB()
        });
    } catch (error) {
        res.status(404).send({
            Error : 'ERROR',
            Message: error.message
        });
    };
};

const loginUser = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await loginDB(email, password);

        res.status(200).send({
            Message : 'Usuario ' + req.body.email,
            data: user
        });
    } catch (error) {
        res.status(400).send({
            Error : 'ERROR',
            Message: error.message
        });
    };
};

const getTasksDB = async (req, res) => {
        const { id } = req.params;
        try {
            const tasks = await tareasDB(id);
            res.status(200).send({
                Message: 'Tareas de usuario ' + id,
                data: tasks
            });
        } catch (error) {
            res.status(400).send({
                Error: 'No ha iniciado sesion',
                message: error.message
            });
        };
        return;
    };

//POSTS-------------------------------------------
const registryUser = async (req, res) => {
    if(req.body.usuario && req.body.email && req.body.password){
        const { usuario, email, password } = req.body;
        try {
            await registryUsersDB(usuario, email, password)
                res.status(201).send({
                    Message: `El usuario ${usuario} creado con exito`
                });
            }   
        catch (error) {
            res.status(400).send({
                Error : 'El usuario no pudo ser creado',
                Message: error.message
            });
        };
        return;
    };
    res.status(400).send({
        Error: "Faltan datos para registro",
    });
};

const aggTask = async (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion } = req.body;
    if(id){
        if(titulo && descripcion){
            try {
                res.status(201).send({
                    Message: 'Tarea creada con exito',
                    data: await aggTaskDB(titulo, descripcion, id)
                });
            } catch (error) {
                res.status(400).send({
                    Error : 'ERROR',
                    Message: error.message
                });
            };
            return;
        };
        res.status(404).send({
            Error : 'ERROR',
            Message: 'Falta infomacion para crear la tarea'
        });
        return;
    };
    res.status(400).send({
        Error : 'ERROR',
        Message: 'Usuario no ha iniciado sesion'
    });
};


module.exports = {
    getUsersDB,
    loginUser,
    getTasksDB,
    registryUser,
    aggTask
};