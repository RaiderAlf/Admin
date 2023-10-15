//DEPENDENCIES
const { Router } = require('express');
const router = Router();
//CONTROLLERS
const { getUsersDB, loginUser, addUsersDB } = require("../controllers/users")
const { getPointsDB, addPoints } = require("../controllers/points")
//MIDDLEWARE
const { userTokenPass } = require('../middleware/index');

//USERS-----------------------------------
router.get('/', getUsersDB)
router.get('/test', loginUser)
router.post('/', addUsersDB)

//POINTS
router.get('/points', getPointsDB)
router.post('/points', addPoints)

module.exports = router;