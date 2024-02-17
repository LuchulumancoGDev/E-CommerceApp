const OrderItem = require('../models/orderItem');
const express = require('express');
const router = express.Router();

// Route to get all products from the database
router.get(`/`, async (req, res) => {
    try {
        debugger
        const orderItems = await OrderItem.find({});
        res.json(orderItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to get a single product by ID
router.get(`/:orderItemId`, async (req, res) => {
    try {
        const orderItem = await OrderItem.findById(req.params.orderItemId);
        if (!orderItem) {
            return res.status(404).json({ error: 'OrderItem not found' });
        }
        res.json(orderItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to add a new product
router.post(`/`, async (req, res) => {
    try {
        const orderItem = new orderItem({
            quantity: req.body.quantity,
            product: req.body.product
        });
        const createdOrderitem = await orderItem.save();
        res.status(201).json(createdOrderitem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to update a product by ID
router.put(`/:orderItemId`, async (req, res) => {
    try {
        const updatedOrderItem = await OrderItem.findByIdAndUpdate(req.params.orderItemId, req.body, { new: true });
        if (!updatedOrderItem) {
            return res.status(404).json({ error: 'OrderItem not found' });
        }
        res.json(updatedOrderItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to delete a product by ID
router.delete(`/:orderItemId`, async (req, res) => {
    try {
        const deletedOrderItem = await OrderItem.findByIdAndDelete(req.params.orderItemId);
        if (!deletedOrderItem) {
            return res.status(404).json({ error: 'OrderItem not found' });
        }
        res.json(deletedOrderItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports=router;