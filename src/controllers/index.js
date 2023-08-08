//DEPENDENCIES
const jwt = require('jsonwebtoken');
//SERVICES
const { usuariosDB, loginDB, tareasDB, registryUsersDB, aggTaskDB, updateTask } = require('../services/index');

//GETS------------------------------------------------

const login = (req, res) => {
    res.render('index')
}

const getUsersDB = async (req, res) => {
    try {
        const resDB = await usuariosDB()
        res.render('users', {
            titulo: 'Todos los usuarios',
            message : resDB
            
        })
    } catch (error) {
        res.render('error',{
            titulo : 'ERROR',
            message: error.message
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

const updateComplete = async (req, res) => {
    const { id } = req.params;
    const { idTarea } = req.body;

    try {
        const response = await updateTask(id, idTarea)
        res.status(200).send({
            Message : 'Tarea actualizada con exito',
            data: response
        })
    } catch (error) {
        res.status(400).send({
            Error : 'ERROR',
            Message : error.message
        });
    };
};


module.exports = {
    login,
    getUsersDB,
    loginUser,
    getTasksDB,
    registryUser,
    aggTask,
    updateComplete
};