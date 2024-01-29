const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

//Send a new message
router.post(messageController.createMessage);

//Retrieve all messages by chatId
router.get('/:chatId', messageController.getMessagesForChat);

// Update Read Status
router.put('/status/:messageId', messageController.updateMessageStatus);

module.exports = router;