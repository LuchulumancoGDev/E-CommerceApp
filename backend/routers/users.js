const User = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// Route to get all products from the database
router.get(`/`, async (req, res) => {
    try {
    
        const users = await User.find({}).select('-passwordHash');
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to get a single product by ID
router.get(`/:userId`, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).select('-passwordHash');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post(`/`, async (req, res) => {
    try {
        const user = new User({
            isAdmin:req.body.isAdmin,
            name: req.body.name,
            email: req.body.email,
            passwordHash: bcrypt.hashSync(req.body.password, 10),
            phone: req.body.phone,
            apartment: req.body.apartment,
            city: req.body.city,
            country: req.body.country,
            street: req.body.street,
            zip: req.body.zip,
        });
        const createdUser = await user.save();
        res.status(201).json(createdUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Route to add a new user
router.post(`/register`, async (req, res) => {
    try {
        const user = new User({
            isAdmin:req.body.isAdmin,
            name: req.body.name,
            email: req.body.email,
            passwordHash: bcrypt.hashSync(req.body.password, 10),
            phone: req.body.phone,
            apartment: req.body.apartment,
            city: req.body.city,
            country: req.body.country,
            street: req.body.street,
            zip: req.body.zip,
        });
        const createdUser = await user.save();
        res.status(201).json(createdUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post(`/login`, async (req, res) => {
    try {

        const user = await User.findOne({email: req.body.email})
        const secret = process.env.secret
        if(!user){
            return res.status(400).send("The user not found ");
        }

        if(user && bcrypt.compareSync(req.body.password, user.passwordHash))
        {
            const token = jwt.sign(
                {
                    userId: user._id,
                    isAdmin: user.isAdmin
                },
                secret,
                {expiresIn: '1d'}
            )
            res.status(200).send({user: user.email, token: token})
        }
        else{
            res.status(400).send('password is wrong!');
        }
      
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to update a product by ID
router.put(`/:userId`, async (req, res) => {
    try {
        const userExists= await User.findById(req.params.userId);
        let newPassword;
        if(req.body.password){
            newPassword =bcrypt.hashSync(req.body.password, 10)
        }
        else{
            newPassword = userExists.passwordHash;
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
            isAdmin: req.body.isAdmin,
            name: req.body.name,
            email:req.body.email,
            passwordHash:req.body.newPassword,
            phone:req.body.phone,
            apartment:req.body.apartment,
            city:req.body.city,
            country:req.body.country,
            street:req.body.street,
            zip:req.body.zip 
        }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to delete a product by ID
router.delete(`/:userId`, async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.userId);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(deletedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get(`/get/count`, async (req, res) => {
    try {
        // const products = await Product.find({}).select('name image -_id'); if you want to get something specific
        const users = await User.countDocuments();
        res.send({
           users: users 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports=router;