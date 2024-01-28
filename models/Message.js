const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    chatId: { type: Schema.Types.ObjectId, ref: 'Chat' },
    senderId: { type: Schema.Types.ObjectId, ref: 'User' },
    content: String,
    type: { type: String, default: 'text' }, // e.g., 'text', 'image', 'video'
    timestamp: { type: Date, default: Date.now },
    readStatus: { type: Boolean, default: false }
  });
  
  module.exports = mongoose.model('Message', messageSchema);
  