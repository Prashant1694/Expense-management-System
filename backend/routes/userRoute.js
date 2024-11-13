const express = require('express');
const { logincontroller, registercontroller } = require('../controllers/userController');

//router object
const router = express.Router();

//routers
//post || login
router.post('/login',logincontroller);


//post || register
router.post('/register',registercontroller);

module.exports = router;