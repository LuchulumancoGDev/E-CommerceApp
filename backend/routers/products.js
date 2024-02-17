const Product = require('../models/product');
const express = require('express');
const router = express.Router();

// Route to get all products from the database
router.get(`/`, async (req, res) => {
    try {
    
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to get a single product by ID
router.get(`/:productId`, async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to add a new product
router.post(`/`, async (req, res) => {
    try {
        const product = new Product({
            name: req.body.name,
            image: req.body.image,
            countInStock: req.body.countInStock
        });
        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to update a product by ID
router.put(`/:productId`, async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to delete a product by ID
router.delete(`/:productId`, async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.productId);
        if (!deletedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(deletedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports=router;