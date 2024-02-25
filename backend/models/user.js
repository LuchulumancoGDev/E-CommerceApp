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

userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
userSchema.set('toJSON', {
    virtuals: true,
});
const User = mongoose.model('User', userSchema);

module.exports = User;