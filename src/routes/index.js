//DEPENDENCIES
const { Router } = require('express');
const router = Router();
//CONTROLLERS
const  {getUsersDB, addUsersDB } = require("../controllers/users")
//MIDDLEWARE
const { userTokenPass } = require('../middleware/index');
const { route } = require('express/lib/application');

//USERS-----------------------------------
router.get('/', getUsersDB)
router.post('/', addUsersDB)

module.exports = router;