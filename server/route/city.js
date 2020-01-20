const express = require ('express')
const db = require('../db')
const utils = require('../utils')

const router = express.Router()

/*router.get('/',(request,response)=>
{
 const connection = db.connect()

 
 const statement=`select * from City`

 connection.query(statement,(error,data)=>
 {
  connection.end()
  response.send(utils.createResult(error,data))
 })
})*/

router.get('/', (request, response) => {
  const connection = db.connect()
  const statement = `select * from City`
  connection.query(statement, (error, data) => {
      connection.end()
      const cities = []
      for (let index = 0; index < data.length; index++) {
          const city = data[index]
          cities.push({
              city_id: city['city_id'],
              city_name: city['city_name'],
              area: city['area'],
              landmark : city['landmark'],
              pincode : city['pincode'],
              
            })
      }
      response.send(utils.createResult(error, cities))
  })
})



router.post('/',(request,response)=>
{
 const connection = db.connect()
 const{
    city_id,
    city_name,
    area,
    landmark,
    pincode
  } =request.body

const statement = `insert into City (city_name, area, landmark, pincode) 
values ('${city_name}','${area}','${landmark}',${pincode})`

connection.query(statement,(error,data)=>
{
 connection.end()
 response.send(utils.createResult(error,data))
})
})


router.delete('/:city_id', (request, response) => {
  const {city_id} = request.params
  const connection = db.connect()
  const statement = `delete from City where city_id = ${city_id}`

      connection.query(statement, (error, data) => {
          connection.end()
          response.send(utils.createResult(error, data))
      })
  })


module.exports = router