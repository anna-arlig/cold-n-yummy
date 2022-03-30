require('dotenv').config()
const express = require('express')
const app = express()
const session = require('express-session')
const {User, Flavor} = require('./models')

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  }))

  app.get('/', async (req, res) => {
    const flavors = await Flavor.findAll({attributes: ['name']})
    res.render('index', {flavors})
  })

  app.get('/vote', async (req, res) => {
    const flavors = await Flavor.findAll({attributes: ['name']})
    res.render('pages/vote', {flavors})
  })

  const PORT = process.env.PORT || 5000
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
  })