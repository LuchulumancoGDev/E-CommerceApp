const mongoose = require('mongoose');

const orderItemSchema = mongoose.Schema({
    quantity: Number,
    product: String
});

orderItemSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
orderItemSchema.set('toJSON', {
    virtuals: true,
});
const OrderItem = mongoose.model('OrderItem', orderItemSchema);

module.exports = OrderItem;