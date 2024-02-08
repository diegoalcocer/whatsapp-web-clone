const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const chatSchema = new Schema({
  chatType: { type: String, default: 'individual' }, // 'individual' or 'group'
  name: { type: String },
  participants: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
  admin: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Adjusted for group chats
  messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
  lastMessage: { type: Schema.Types.ObjectId, ref: 'Message' },
  chatCreatedAt: { type: Date, default: Date.now },
  chatUpdatedAt: { type: Date, default: Date.now },
  iconUrl: { type: String },
});

  
  module.exports = mongoose.model('Chat', chatSchema);
  