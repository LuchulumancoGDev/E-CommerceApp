const mongoose = require('mongoose');

// Define product schema
const userSchema = mongoose.Schema({
    isAdmin: {
        type: Boolean,
        default:false,
    },
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    passwordHash:{
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    apartment: {
        type: String,
        default: '',
    },
    city: {
        type: String,
        default: '',
    },
    country: {
        type: String,
        default: '',
    },
    street:{
        type: String,
        default: '',
    },
    zip: {
        type: String,
        default: '',
    },
    
});

userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
userSchema.set('toJSON', {
    virtuals: true,
});
const User = mongoose.model('User', userSchema);

module.exports = User;