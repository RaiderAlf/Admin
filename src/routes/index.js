//DEPENDENCIES
const { Router } = require('express');
const router = Router();
//CONTROLLERS
const { getUsersDB, addUsersDB } = require("../controllers/users")
const { getPointsDB } = require("../controllers/points")
//MIDDLEWARE
const { userTokenPass } = require('../middleware/index');

//USERS-----------------------------------
router.get('/', getUsersDB)
router.post('/', addUsersDB)

//POINTS
router.get('/points', getPointsDB)

module.exports = router;