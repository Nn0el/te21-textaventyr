const express = require('express')
const router = express.Router()
const pool = require('../db')

const story = require('../data/story.json')

router.get('/', function (req, res) {
  console.log(story.parts[0])
  res.render('index.njk', { title: 'Welcome', part: story.parts[0], username: req.session.username })
})

router.post('/username', function (req, res){
req.session.username= req.body.username
console.log(req.session.username)
res.redirect('/')

})

router.get('/story/:id', function (req, res) {
  const part = story.parts.find((part) => part.id === parseInt(req.params.id))
  if (!part) {
    res.status(404).render('404.njk', { title: '404' })
    return
  }
  res.render('part.njk', { title: part.name, part: part })


const name = part.name.replace('[PLAYER]' , req.session.username)
console.log(part)
part={...part, name: name}
console.log(part)
res.render('part.njk' , {title: name, part: part})
})

router.get('/dbtest/:id', async (req, res) => {
try {
  const id =req.params.id

  const [parts] = await pool

  .promise()

  .query(`SELECT * FROM noel_part WHERE id = ${id}`)

  const [options] = await pool

  .promise()

  .query(`SELECT * FROM noel_option WHERE id = ${id}`)
  const part = {...parts[0], options}
  
res.render('part.njk'),{

  username: req.session.username,

  title: part.name,

  part,
}

}
catch (error){

  console.log (error)
  res.sendStatus(500)
}
module.exports = router
}

)




