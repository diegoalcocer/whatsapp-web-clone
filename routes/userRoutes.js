const express = require('express')
const router = express.Router();
const userController = require('../controllers/userController');
const authenticate = require('../middleware/authenticate');

//Register a new user
router.post('/', userController.createUser);

//Retrieve user details
router.get('/:id',authenticate,userController.getUser);

// Login
router.post('/login', userController.loginUser);

module.exports = router;