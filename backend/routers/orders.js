const Order = require('../models/order');
const express = require('express');
const OrderItem = require('../models/orderItem');
const router = express.Router();

// Route to get all products from the database
router.get(`/`, async (req, res) => {
    try {
        const orders = await Order.find({})
        .populate('user', 'name')
        .populate({
            path:'orderItems', populate: 
            {
                path:'product', populate: 'category'
            }
        })
        .sort({'dateOrdered':-1});
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to get a single product by ID
router.get(`/:orderId`, async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId).populate('user', 'name').populate({
            path:'orderItems', populate: 
            {
                path:'product', populate: 'category'
            }
        });
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
        const orderItemsIds =Promise.all( req.body.orderItems.map(async orderItem =>{
            let newOrderItem = new OrderItem({
                quantity: orderItem.quantity,
                product: orderItem.product
            })

            newOrderItem = await newOrderItem.save();

            return newOrderItem._id;
        }))
        const orderItemsIdsResolved= await orderItemsIds
       
        const totalPrices = await Promise.all(orderItemsIdsResolved.map(async (orderItemId) =>{
            const orderItem = await OrderItem.findById(orderItemId).populate('product', 'price');
            const totalPrice = orderItem.product.price * orderItem.quantity;
            return totalPrice
        }))

        const totalPrice = totalPrices.reduce((a,b) => a + b, 0)

        console.log(totalPrices);

        const order = new Order({
            orderItems: orderItemsIdsResolved,
            status: req.body.status,
            shippingAddress1: req.body.shippingAddress1,
            shippingAddress2: req.body.shippingAddress2,
            city: req.body.city,
            zip: req.body.zip,
            country: req.body.country,
            phone: req.body.phone,
            totalPrice: totalPrice,
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
        const updatedOrder = await Order.findByIdAndUpdate(req.params.orderId, {
            status: req.body.status
        }, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to delete a product by ID
router.delete('/:orderId', async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.orderId);
        if (!deletedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }
        // Delete associated orderItems
        await Promise.all(deletedOrder.orderItems.map(async orderItemId => {
            await OrderItem.findByIdAndDelete(orderItemId);
        }));
        res.json(deletedOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/get/totalsales', async(req,res) => {
    const totalSales = await Order.aggregate([
        {$group: {_id:null, totalsales: {$sum: '$totalPrice'}}}
    ])

    if(!totalSales){
        return res.status(400).send('The order sales cannot be generated')
    }

    res.send({totalsales: totalSales.pop().totalsales})
})

router.get(`/get/count`, async (req, res) => {
    try {
        // const products = await Product.find({}).select('name image -_id'); if you want to get something specific
        const orderCounts = await Order.countDocuments();
        res.send({
           orderCounts: orderCounts 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get(`/get/userorders/:userid`, async (req, res) => {
    try {
        const userOrderList = await Order.find({user: req.params.userid})
        .populate({
            path:'orderItems', populate: 
            {
                path:'product', populate: 'category'
            }
        })
        .sort({'dateOrdered':-1});
        res.json(userOrderList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports=router;