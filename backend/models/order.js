const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    orderItems: {},
    status: String,
    shippingAddress1:String,
    shippingAddress2:String,
    city: String,
    zip: String,
    country:String,
    phone: String,
    totalPrice:String,
    user: String,
    dateOrdered: Date
});
orderSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
orderSchema.set('toJSON', {
    virtuals: true,
});
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
