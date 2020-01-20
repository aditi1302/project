const express = require('express')
const bodyParser = require('body-parser')

// import the routers
const routerCategory = require('./route/category')
const routerCake = require('./route/cake')
const routerUser = require('./route/user')
const routerCity = require('./route/city')
const routerOrder = require('./route/order_details')
const routerPayment = require('./route/payment')
const routerDeliveryBoy = require('./route/delivery_boy')
const app = express()

// add middlewares

// for CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json())
app.use('/category', routerCategory)
app.use('/cake', routerCake)
app.use('/user', routerUser)
app.use('/city', routerCity)
app.use('/order_details', routerOrder)
app.use('/payment', routerPayment)
app.use('/delivery_boy', routerDeliveryBoy)
app.use(express.static('thumbnails'))


app.listen(4000, '0.0.0.0', () => {
    console.log('server started  on port 4000')
})
