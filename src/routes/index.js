//DEPENDENCIES
const { Router } = require('express');
const router = Router();
//CONTROLLERS
const { getUsersDB, loginUser, registryUser, getTasksDB, aggTask } = require('../controllers/index');
//MIDDLEWARE
const { userTokenPass } = require('../middleware/index');

//GETS-----------------------------------
router.get('/admin', userTokenPass(), getUsersDB);
router.get('/:id',  userTokenPass(), getTasksDB);
router.get('/login', loginUser);


//POSTS ---------------------------------
router.post('/registry', registryUser);
router.post('/:id', userTokenPass(), aggTask)

module.exports = router;