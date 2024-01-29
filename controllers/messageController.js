const Message = require('../models/Message');

// Create a new message
exports.createMessage = async (req, res) => {
  try {
      const newMessage = new Message({
          chatId: req.body.chatId, 
          senderId: req.body.senderId, 
          content: req.body.content, 
          type: req.body.type || 'text' 
      });
      await newMessage.save();

      // Additional logic to notify the recipient(s) can be added here

      res.status(201).json(newMessage);
  } catch (error) {
      res.status(400).json({ message: "Error sending message", error: error.message });
  }
};


exports.getMessagesForChat = async (req, res) => {
  try {
      const chatId = req.params.chatId;
      const messages = await Message.find({ chatId: chatId }).sort({ timestamp: 1 });
      res.status(200).json(messages);
  } catch (error) {
      res.status(500).json({ message: "Error retrieving messages", error: error.message });
  }
};


// update read status
exports.updateMessageStatus = async (req, res) => {
  try {
      const { messageId } = req.params;
      const updatedMessage = await Message.findByIdAndUpdate(
          messageId, 
          { readStatus: true },
          { new: true } // Mongoose: provides immediate access to the updated document
      );
      res.status(200).json(updatedMessage);
  } catch (error) {
      res.status(500).json({ message: "Error updating message status", error: error.message });
  }
};

