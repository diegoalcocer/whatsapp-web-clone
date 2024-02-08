const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  chatId: { type: Schema.Types.ObjectId, ref: 'Chat', required: true },
  senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: String,
  type: { type: String, default: 'text' }, // e.g., 'text', 'image', 'video'
  timestamp: { type: Date, default: Date.now },
  readStatus: [{
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    status: Boolean, // true if read, false if not
    readAt: Date, // Timestamp when the message was read
  }],
});

  
  module.exports = mongoose.model('Message', messageSchema);
  