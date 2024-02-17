const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');


require('dotenv/config');

const api = process.env.API_URL;
const productsRouter = require('./routers/products')
const categoriesRouter = require('./routers/categories')
const orderItemsRouter = require('./routers/orderItems')
const orderRouter = require('./routers/orders')
const userRouter = require('./routers/users')

// Middleware
app.use(express.json());
app.use(morgan('tiny'));

//Routers
app.use(`${api}/products`, productsRouter);
app.use(`${api}/categories`, categoriesRouter);
app.use(`${api}/orderItems`, orderItemsRouter);
app.use(`${api}/orders`, orderRouter);
app.use(`${api}/users`, userRouter);





// Connect to MongoDB
mongoose.connect(process.env.CONNECTION_STRING, {
    
    dbName: 'eshop-database'
})
.then(() => {
    console.log('Database Connection is ready...');
})
.catch((err) => {
    console.error('Database Connection Error:', err);
});

// Start the server
const port = process.env.PORT || 3000; // Use PORT environment variable or default to 5000
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
