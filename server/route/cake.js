const express = require ('express')
const db = require('../db')
const utils = require('../utils')
const multer = require('multer')
const upload = multer({dest: 'thumbnails/'})

const router = express.Router()

router.get('/all', (request, response) => {
    const connection = db.connect()
    const statement = `select * from Cake`
    connection.query(statement, (error, data) => {
        connection.end()
        const cakes = []
        for (let index = 0; index < data.length; index++) {
            const cake = data[index]
            cakes.push({
                cake_id: cake['cake_id'],
                cake_name: cake['cake_name'],
                price: cake['price'],
                weight : cake['weight'],
                quantity : cake['quantity'],
                rating : cake['rating'],
                category_id : cake['category_id'],
                cake_image  : cake['cake_image']
            })
        }
        response.send(utils.createResult(error, cakes))
    })
})



router.get('/egg', (request, response) => {
    const connection = db.connect()
    const statement = `select c.cake_name, c.price, c.weight, c.quantity, c.rating, c.cake_image from Cake c INNER JOIN Category ct ON (c.category_id = ct.category_id) where ct.cake_category = 'Egg'`
    connection.query(statement, (error, data) => {
        //console.log("++++++++++++++++"+statement)
        connection.end()
        const cakes = []
        for (let index = 0; index < data.length; index++) {
            const cake = data[index]
            cakes.push({
                cake_name: cake['cake_name'],
                price: cake['price'],
                weight : cake['weight'],
                quantity : cake['quantity'],
                rating : cake['rating'],
                cake_image  : cake['cake_image']
               
            })
        }
        response.send(utils.createResult(error, data))
    })
})



router.get('/eggless', (request, response) => {
    const connection = db.connect()
    const statement = `select c.cake_name, c.price, c.weight, c.quantity, c.rating, c.cake_image from Cake c INNER JOIN Category ct ON (c.category_id = ct.category_id) where ct.cake_category = 'Eggless'`
    connection.query(statement, (error, data) => {
        connection.end()
        const cakes = []
        for (let index = 0; index < data.length; index++) {
            const cake = data[index]
            cakes.push({
                cake_name: cake['cake_name'],
                price: cake['price'],
                weight : cake['weight'],
                quantity : cake['quantity'],
                rating : cake['rating'],
                cake_image  : cake['cake_image']
               
            })
        }
        response.send(utils.createResult(error, data))
    })
})



/*router.post('/', (request, response) => {
    const {cake_id, cake_name, price, weight, quantity, rating, category_id, cake_image } = request.body

    const connection = db.connect()
    const statement = `insert into Cake (cake_name, price, weight, quantity, rating, category_id, cake_image ) values ('${cake_name}', ${price}, '${weight}', ${quantity}, ${rating}, ${category_id}, '${cake_image }')`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})*/


router.post('/', upload.single('cake_image'), (request, response) => {
    console.log('+++++++++++++')
    const {cake_name, price, weight, quantity, rating, category_id} = request.body
    const cake_image = request.file.filename

    const connection = db.connect()
    const statement = `insert into Cake (cake_name, price, weight, quantity, rating, category_id, cake_image ) values('${cake_name}', ${price}, '${weight}', ${quantity}, ${rating}, ${category_id}, '${cake_image}')`
    connection.query(statement, (error, data) => {
        console.log(statement);
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.put('/:cake_id', (request, response) => {
    const {cake_id} = request.params
    const {cake_name, price, weight, quantity, rating } = request.body
    const connection = db.connect()
    const statement = `update Cake set cake_name = '${cake_name}', price = ${price}, weight = '${weight}', quantity = '${quantity}', rating = '${rating}'  where cake_id = ${cake_id}`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.delete('/:cake_id', (request, response) => {
    const {cake_id} = request.params
    const connection = db.connect()
    const statement = `delete from Cake where cake_id = ${cake_id}`

        connection.query(statement, (error, data) => {
            connection.end()
            response.send(utils.createResult(error, data))
        })
    })

module.exports = router