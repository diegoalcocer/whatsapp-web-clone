const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// Create a new chat
router.post('/', chatController.createChat);

//Retrieve chats for a user
router.get('/:userId', chatController.getUserChats);

module.exports = router;