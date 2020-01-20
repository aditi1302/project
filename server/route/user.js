const db = require('../db')
const utils = require('../utils')
const express = require('express')
//const cryptoJs = require('crypto-js')

const router = express.Router()

router.get('/', (request, response) => {
    const connection = db.connect()
    const statement = `select * from User`
    connection.query(statement, (error, data) => {
        connection.end()
        const users = []
        for (let index = 0; index < data.length; index++) {
            const user = data[index]
            users.push({
                user_id: user['user_id'],
                full_name: user['full_name'],
                email: user['email'],
                password: user['password'],
                contact_no : user['contact_no'],
                user_role : user['user_role'],
                
            })
        }
        response.send(utils.createResult(error, users))
    })
})



router.post('/', (request, response) => {
    const {full_name, email, password, contact_no, user_role } = request.body
    //const encryptedPassword = '' + cryptoJs.MD5(password)
    const connection = db.connect()
    const statement = `insert into User (full_name, email, password, contact_no, user_role) values ('${full_name}', '${email}', '${password}', '${contact_no}', '${user_role}')`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.post('/login', (request, response) => {
    const {email, password} = request.body
    //const encryptedPassword = '' + cryptoJs.MD5(password)
    const connection = db.connect()
    const statement = `select * from User where email = '${email}' and password = '${password}'`
    connection.query(statement, (error, users) => {
        connection.end()
        
        if (users.length == 0) {
            response.send(utils.createResult('user does not exist'))
        } else {
            const user = users[0]
            const info = {
                full_name: user['full_name'],
                email: user['email'],
                password :user['password']
            }
            response.send(utils.createResult(null, info))
        }
    })
})

router.post('/register', (request, response) => {
    const connection = db.connect()
    const {full_name, email, password, contact_no, user_role} = request.body
    const statement = `insert into User(full_name, email, password, contact_no, user_role) values ('${full_name}', '${email}', '${password}', '${contact_no}', '${user_role}')`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})



router.put('/:user_id', (request, response) => {
    const {user_id} = request.params
    const {full_name, email, password, contact_no,user_role, city_id } = request.body
    const connection = db.connect()
    const statement = `update User set full_name ='${full_name}', email = '${email}', contact_no = '${contact_no}', user_role = '${user_role}', city_id = '${city_id}'  where user_id = ${user_id}`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.delete('/:user_id', (request, response) => {
    const {user_id} = request.params
    const connection = db.connect()
    const statement = `delete from User where user_id = ${user_id}`

        connection.query(statement, (error, data) => {
            connection.end()
            response.send(utils.createResult(error, data))
        })
    })


module.exports = router