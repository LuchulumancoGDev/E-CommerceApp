const Order = require('../models/order');
const express = require('express');
const router = express.Router();

// Route to get all products from the database
router.get(`/`, async (req, res) => {
    try {
        debugger
        const orders = await Order.find({});
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to get a single product by ID
router.get(`/:orderId`, async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to add a new product
router.post(`/`, async (req, res) => {
    try {
        const order = new Order({
            orderItems: req.body.orderItems,
            status: req.body.status,
            shippingAddress1: req.body.shippingAddress1,
            shippingAddress2: req.body.shippingAddress2,
            city: req.body.city,
            zip: req.body.zip,
            country: req.body.country,
            phone: req.body.phone,
            totalPrice: req.body.totalPrice,
            user: req.body.user,
            dateOrdered: req.body.dateOrdered,
        });
        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to update a product by ID
router.put(`/:orderId`, async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.orderId, req.body, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to delete a product by ID
router.delete(`/:orderId`, async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.orderId);
        if (!deletedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json(deletedOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports=router;