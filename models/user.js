// Imports
const mongoose = require('mongoose');

// Create  a new schema
const userSchema = mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    resetToken: { type: String, default: null },
    resetTokenExpiry: { type: Date, default: null },
});

// Create a new model and export it
module.exports = mongoose.model('User', userSchema, 'users');