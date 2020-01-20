const express = require ('express')
const db = require('../db')
const utils = require('../utils')

const router = express.Router()

router.get('/', (request, response) => {
    const connection = db.connect()
    const statement = `select * from OrderDetails`
    connection.query(statement, (error, data) => {
        connection.end()
        const orders = []
        for (let index = 0; index < data.length; index++) {
            const order = data[index]
            orders.push({
                order_id: order['order_id'],
                order_date: order['order_date'],
                del_boy_id: order['del_boy_id']
            })
        }
        response.send(utils.createResult(error, orders))
    })
})

router.post('/', (request, response) => {
    const {order_id, order_date, del_boy_id} = request.body

    const connection = db.connect()
    const statement = `insert into OrderDetails (order_date, del_boy_id) values ('${order_date}', ${del_boy_id})`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.put('/:order_id', (request, response) => {
    const {order_id} = request.params
    const {order_date,  del_boy_id} = request.body
    const connection = db.connect()
    const statement = `update OrderDetails set order_date = '${order_date}', del_boy_id = ${del_boy_id}  where order_id = ${order_id}`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.delete('/:order_id', (request, response) => {
    const {order_id} = request.params
    const connection = db.connect()
    const statement = `delete from OrderDetails where order_id = ${order_id}`

        connection.query(statement, (error, data) => {
            connection.end()
            response.send(utils.createResult(error, data))
        })
    })


module.exports = router