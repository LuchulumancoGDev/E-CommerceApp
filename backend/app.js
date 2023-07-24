const express = require('express');
const app = express();
const morgan = require('morgan')

//Middleware
app.use(express.json());
app.use(morgan('tiny'));

require('dotenv/config')

const api = process.env.API_URL



app.get(`${api}/products`, (req, res) => {
    const product = {
        id: 1,
        name: 'hair dresser',
        image: 'some_url',
    }
    res.send(product)

    console.log(product);
})

app.post(`${api}/products`, (req, res) => {
    const newProduct = req.body
    console.log(newProduct)
    res.send(newProduct)
})
app.listen(3000, () => {
    console.log(api)
    console.log('server is running http://localhost:3000')
})
