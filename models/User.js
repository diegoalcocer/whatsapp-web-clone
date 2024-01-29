const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    phoneNumber:{type: String, unique: true, required: true, index: true},
    userName: {type: String},
    hashedPassword: {type: String, required: true},
    profileInfo:{
        displayName: String,
        profilePictureUrl: String,
        status: String
    },
    lastSeen: {type: Date},
    createdAt: {type:Date, default: Date.now}
});

module.exports = mongoose.model('User', userSchema);