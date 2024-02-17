const mongoose = require('mongoose');

// Define product schema
const userSchema = mongoose.Schema({
    isAdmin: Boolean,
    name: String,
    email:String,
    passwordHash:String,
    phone: String,
    apartment: String,
    city: String,
    country: String,
    street: String,
    zip: String,
    
});

const User = mongoose.model('User', userSchema);

module.exports = User;