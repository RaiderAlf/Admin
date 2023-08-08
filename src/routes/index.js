//DEPENDENCIES
const { Router } = require('express');
const router = Router();
//CONTROLLERS
const { getUsersDB, loginUser, registryUser, getTasksDB, aggTask, updateComplete, login } = require('../controllers/index');
//MIDDLEWARE
const { userTokenPass } = require('../middleware/index');

//GETS-----------------------------------
router.get('/', login)
router.get('/admin', /* userTokenPass() */ getUsersDB);
router.get('/:id',  userTokenPass(), getTasksDB);


//POSTS ---------------------------------
router.post('/login', loginUser);
router.post('/registry', registryUser);
router.post('/:id', userTokenPass(), aggTask)

//PUT--------------------------
router.put('/:id', userTokenPass(), updateComplete )

module.exports = router;