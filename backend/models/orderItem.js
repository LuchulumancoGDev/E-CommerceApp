const mongoose = require('mongoose');

const orderItemSchema = mongoose.Schema({
    quantity: Number,
    product: String
});

const OrderItem = mongoose.model('OrderItem', orderItemSchema);

module.exports = OrderItem;