const express = require('express');
const { loginController, registerController, googleLoginController } = require('../controllers/userController');

//router object
const router = express.Router();

//routers
//post || login
router.post('/login',loginController);


//post || register
router.post('/register',registerController);

//post || Google-Sign in
router.post('/google-login',googleLoginController);

module.exports = router;