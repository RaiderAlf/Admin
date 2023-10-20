//DEPENDENCIES
const { Router } = require('express');
const router = Router();
//CONTROLLERS
const { getUsersDB, loginUser, addUsersDB } = require("../controllers/users")
const { getPointsDB, addPoints } = require("../controllers/points")
//MIDDLEWARE
const { userTokenPass } = require('../middleware/index');

//USERS-----------------------------------
router.get('/admin', getUsersDB)
router.post('/', loginUser)
router.post('/signin', addUsersDB)

//POINTS
router.get('/points', userTokenPass(), getPointsDB)
router.post('/points', addPoints)

module.exports = router;