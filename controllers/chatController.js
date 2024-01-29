const Chat = require('../models/Chat');

// Create a new chat
exports.createChat = async (req, res) => {
    try {
        const newChat = new Chat({
            chatType: req.body.chatType,
            participants: req.body.participants,
            admin: req.body.admin,
            messages: req.body.messages,
            lastMessage: req.body.lastMessage,
            chatCreatedAt: req.body.chatCreatedAt,
            chatUpdatedAt: req.body.chatUpdatedAt
        });
        await newChat.save();
        res.status(201).json(newChat);
    } catch (error) {
        res.status(400).json({ message: "Error creating chat", error: error.message });
    }
};

// Get chats for a specific user
exports.getUserChats = async (req, res) => {
    try {
        const chats = await Chat.find({ participants: req.params.userId });
        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving chats", error: error.message });
    }
};
