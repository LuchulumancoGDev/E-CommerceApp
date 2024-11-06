const Category = require('../models/category');
const express = require('express');
const router = express.Router();

// Route to get all products from the database
router.get(`/`, async (req, res) => {
    try {
 
        const categories = await Category.find({});
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to get a single product by ID
router.get(`/:categoryId`, async (req, res) => {
    try {
        const category = await Category.findById(req.params.categoryId);
        if (!category) {
            return res.status(404).json({ error: 'Categoty not found' });
        }
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.post(`/`, async (req, res) => {
    try {
        const category = new Category({
            name: req.body.name,
            color: req.body.color,
            icon: req.body.icon
        });
        const createdCategory = await category.save();
        res.status(201).json(createdCategory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to update a product by ID
router.put(`/:categoryId`, async (req, res) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(req.params.categoryId, req.body, { new: true });
        if (!updatedCategory) {
            return res.status(404).json({ error: 'Categoty not found' });
        }
        res.json(updatedCategory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to delete a product by ID
router.delete(`/:categoryId`, async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.categoryId);
        if (!deletedCategory) {
            return res.status(404).json({ error: 'Categoty not found' });
        }
        res.json(deletedCategory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports=router;