const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

require('dotenv/config');

const api = process.env.API_URL;

// Middleware
app.use(express.json());
app.use(morgan('tiny'));

// Define product schema
const productSchema = mongoose.Schema({
    name: String,
    image: String,
    countInStock: {
        type: Number,
        required: true
    }
});

const Product = mongoose.model('Product', productSchema);

// Route to get all products from the database
app.get(`${api}/products`, async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to get a single product by ID
app.get(`${api}/products/:productId`, async (req, res) => {
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
app.post(`${api}/products`, async (req, res) => {
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
app.put(`${api}/products/:productId`, async (req, res) => {
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
app.delete(`${api}/products/:productId`, async (req, res) => {
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

// Connect to MongoDB
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'eshop-database'
})
.then(() => {
    console.log('Database Connection is ready...');
})
.catch((err) => {
    console.error('Database Connection Error:', err);
});

// Start the server
const port = process.env.PORT || 5000; // Use PORT environment variable or default to 5000
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
