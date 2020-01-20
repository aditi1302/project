const express = require ('express')
const db = require('../db')
const utils = require('../utils')

const router = express.Router()

/*router.get('/',(request,response)=>
{
 const connection = db.connect()

 
 const statement=`select * from Category`

 connection.query(statement,(error,data)=>
 {
  connection.end()
  response.send(utils.createResult(error,data))
 })
})*/

router.get('/', (request, response) => {
  const connection = db.connect()
  const statement = `select * from Category`
  connection.query(statement, (error, data) => {
      connection.end()
      const categories = []
      for (let index = 0; index < data.length; index++) {
          const category = data[index]
          categories.push({
              category_id: category['category_id'],
              cake_category: category['cake_category']
            })
      }
      response.send(utils.createResult(error, categories))
  })
})



router.post('/',(request,response)=>
{
 const connection = db.connect()
 const{
    category_id,
    cake_category
  } =request.body

const statement = `insert into Category (category_id,cake_category) 
values (${category_id},'${cake_category}')`

connection.query(statement,(error,data)=>
{
 connection.end()
 response.send(utils.createResult(error,data))
})
})

router.put('/:category_id',(request,response)=>
{
    const {category_id} = request.params
    const {cake_category} = request.body
  const connection = db.connect()

  const statement=`update Category set cake_category='${cake_category}' where category_id=${category_id}`

  connection.query(statement,(error,data)=>
  {
  connection.end()
  response.send(utils.createResult(error,data))
  })
})

router.delete('/:category_id', (request, response) => {
    const {category_id} = request.params
    const connection = db.connect()
    const statement = `delete from Category where category_id = ${category_id}`

        connection.query(statement, (error, data) => {
            connection.end()
            response.send(utils.createResult(error, data))
        })
    })



module.exports = router
