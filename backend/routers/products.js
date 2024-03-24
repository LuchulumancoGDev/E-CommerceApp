const Category = require('../models/category');
const Product = require('../models/product');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const mongoose = require('mongoose');

const FILE_TYPE_MAP={
    'image/png':'png',
    'image/jpeg':'jpeg',
    'image/jpg':'jpg'
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid=FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('Invalid image type');
        if(isValid){
            uploadError=null
        }
      cb(uploadError, 'public/uploads')
    },
    filename: function (req, file, cb) {
      const fileName=file.originalname.split(' ').join('-');
      const extension = FILE_TYPE_MAP[file.mimetype];
      cb(null, `${fileName}-${Date.now()}.${extension}` )
    }
  })
  
  const uploadOptions = multer({ storage: storage })


// Route to get all products from the database
router.get(`/`, async (req, res) => {
    let filter = {};
    try {
        if(req.query.categories){
            filter = {category: req.query.categories.split(',')}
        }
        // const products = await Product.find({}).select('name image -_id'); if you want to get something specific
        const products = await Product.find(filter).populate('category');
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to get a single product by ID
router.get(`/:productId`, async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId).populate('category');
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to add a new product
router.post(`/`,uploadOptions.single('image'), async (req, res) => {
   
    try {
        const category = await Category.findById(req.body.category);
        if(!category) return res.status(400).send('Invalid Category')
        const file = req.file;
        if(!file) return res.status(400).send('No image in the request')
        const fileName = req.file.filename;
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`
        const product = new Product({
            name: req.body.name,
            image: `${basePath}${fileName}`,
            richDescription:req.body.richDescription,
            description:req.body.description,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured,
            countInStock: req.body.countInStock
        });
        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to update a product by ID
router.put(`/:productId`,uploadOptions.single('image'), async (req, res) => {
    
    try {
        const category = await Category.findById(req.body.category);
    if(!category) return res.status(400).send('Invalid Category')
        const product = await Product.findById(req.params.productId)
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        const file=req.file;
        let imagepath;
        if(file){
            const fileName = req.file.filename;
            const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
            imagepath=`${basePath}${fileName}`;
        }
        else{
            imagepath=product.image;
        }
        const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, 
            {
                name: req.body.name,
                image: imagepath,
                richDescription:req.body.richDescription,
                description:req.body.description,
                brand: req.body.brand,
                price: req.body.price,
                category: req.body.category,
                rating: req.body.rating,
                numReviews: req.body.numReviews,
                isFeatured: req.body.isFeatured,
                countInStock: req.body.countInStock 
            }, { new: true });
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

router.get(`/get/count`, async (req, res) => {
    try {
        // const products = await Product.find({}).select('name image -_id'); if you want to get something specific
        const products = await Product.countDocuments();
        res.send({
           products: products 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get(`/get/featured/:count`, async (req, res) => {
       
    try {
        const count = req.params.count ? req.params.count : 0
        const products = await Product.find({isFeatured: true}).limit(+count);
        res.send({
           products: products 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put(`/gallery-images/:productId`,uploadOptions.array('images', 10), async (req, res) => {
    
    try {
        const files = req.files;
        let imagePaths=[];
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`
        if(files){
            files.map(file =>{
                imagePaths.push(`${basePath}${file.filename}`);
            })
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.productId, 
            {
                images: imagePaths
            }, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports=router;