const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require("cors");

const commentsRouter = require('./Routes/commentsRouter')
const discountsRouter = require('./Routes/discountsRouter')
const ordersRouter = require('./Routes/ordersRouter')
const productsRouter = require('./Routes/productsRouter')
const usersRouter = require('./Routes/usersRouter')


const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use('/api/comments' , commentsRouter)
app.use('/api/discounts' , discountsRouter)
app.use('/api/orders' , ordersRouter)
app.use('/api/products' , productsRouter)
app.use('/api/users' , usersRouter)

mongoose.connect('mongodb://127.0.0.1:27017/ShopRTLCms');
mongoose.Promise = global.Promise;



app.listen(8000)