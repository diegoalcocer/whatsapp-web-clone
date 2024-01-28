const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    chatType: { type: String, default: 'individual' }, // 'individual' or 'group'
    participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    admin: { type: Schema.Types.ObjectId, ref: 'User' },
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
    lastMessage: { type: Schema.Types.ObjectId, ref: 'Message' },
    chatCreatedAt: { type: Date, default: Date.now },
    chatUpdatedAt: Date
  });
  
  module.exports = mongoose.model('Chat', chatSchema);
  