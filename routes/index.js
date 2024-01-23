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

router.get('/dbtest', async (req, res) => {
try {
  const [parts] = await pool.promise().query('SELECT * FROM noel_part')
  res.json({parts})
} catch (error){

  console.log (error)
  res.sendStatus(500)
}

}

)





module.exports = router
