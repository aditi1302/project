const express = require ('express')
const db = require('../db')
const utils = require('../utils')

const router = express.Router()

router.get('/', (request, response) => {
    const connection = db.connect()
    const statement = `select * from Payment`
    connection.query(statement, (error, data) => {
        connection.end()
        const payments = []
        for (let index = 0; index < data.length; index++) {
            const payment = data[index]
            payments.push({
                payment_id: payment['payment_id'],
               payment_mode: payment['payment_mode'],
                payment_status: payment['payment_status'],
                bill_cost : payment['bill_cost'],
                transaction_id : payment['transaction_id']
            })
        }
        response.send(utils.createResult(error, payments))
    })
})


router.post('/', (request, response) => {
    const {payment_id, payment_mode, payment_status, bill_cost, transaction_id } = request.body

    const connection = db.connect()
    const statement = `insert into Payment (payment_mode, payment_status, bill_cost, transaction_id) values ('${payment_mode}', '${payment_status}', ${bill_cost}, ${transaction_id})`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.put('/:payment_id', (request, response) => {
    const {payment_id} = request.params
    const { payment_mode, payment_status, bill_cost, transaction_id } = request.body
    const connection = db.connect()
    const statement = `update Payment set payment_mode = '${payment_mode}', payment_status = '${payment_status}', bill_cost = ${bill_cost}, transaction_id = ${transaction_id}  where payment_id = ${payment_id}`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})


router.delete('/:payment_id', (request, response) => {
    const {payment_id} = request.params
    const connection = db.connect()
    const statement = `delete from Payment where payment_id = ${payment_id}`

        connection.query(statement, (error, data) => {
            connection.end()
            response.send(utils.createResult(error, data))
        })
    })


module.exports = router