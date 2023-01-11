const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserController');
const Authentication = require('../Middleware/Authentication');
router.post('/createUser',UserController.createUser);
router.post('/userLogin',UserController.userLogin);
router.get('/getUser',Authentication,UserController.getUser);
router.patch('/updateUser',Authentication,UserController.updateUser);
router.delete('/logout',UserController.logout);

module.exports = router ;