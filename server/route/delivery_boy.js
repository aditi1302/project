const db = require('../db')
const utils = require('../utils')
const express = require('express')
//const cryptoJs = require('crypto-js')

const router = express.Router()

router.get('/', (request, response) => {
    const connection = db.connect()
    const statement = `select * from DeliveryBoy`
    connection.query(statement, (error, data) => {
        connection.end()
        const delboys = []
        for (let index = 0; index < data.length; index++) {
            const delboy = data[index]
            delboys.push({
                del_boy_id: delboy['del_boy_id'],
                del_boy_name: delboy['del_boy_name'],
                cont_no : delboy['cont_no']
            })
        }
        response.send(utils.createResult(error, delboys))
    })
})



router.post('/', (request, response) => {
    const {del_boy_id, del_boy_name, cont_no } = request.body
    //const encryptedPassword = '' + cryptoJs.MD5(password)
    const connection = db.connect()
    const statement = `insert into DeliveryBoy (del_boy_name, cont_no) values ('${del_boy_name}', ${cont_no})`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})



router.put('/:del_boy_id', (request, response) => {
    const {del_boy_id} = request.params
    const {del_boy_name, cont_no } = request.body
    const connection = db.connect()
    const statement = `update DeliveryBoy set del_boy_name ='${del_boy_name}', cont_no = ${cont_no}`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.delete('/:del_boy_id', (request, response) => {
    const {del_boy_id} = request.params
    const connection = db.connect()
    const statement = `delete from DeliveryBoy where del_boy_id = ${del_boy_id}`

        connection.query(statement, (error, data) => {
            connection.end()
            response.send(utils.createResult(error, data))
        })
    })


module.exports = router