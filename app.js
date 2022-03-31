require('dotenv').config()
const { name } = require('ejs')
const express = require('express')
const app = express()
const session = require('express-session')
const sequelize = require('sequelize')
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
    const highscore = await User.findAll({
        attributes: ['vote'],
        group: 'vote',
        order: [[sequelize.fn('COUNT', 'vote'), 'DESC']]
    })
    console.log(highscore)
    res.render('index', {highscore})
  })

  app.get('/vote', async (req, res) => {
    const flavors = await Flavor.findAll({attributes: ['name']})
    res.render('pages/vote', {flavors})
  })

  app.post('/submitvote', async (req, res) => {
    let vote = await Flavor.findAll({
      attributes: ['name'],
      where: {
        name: req.body.flavor
      }
    });
    await User.create({email: req.body.email, vote: vote.name})
    res.redirect('/thanks')
  })

  app.get('/thanks', (req, res) => {
      res.render('pages/thanks')
  })

  app.get('/suggest', (req, res) => {
    res.render('pages/suggest')
})

app.get('/login', (req, res) => {
    res.render('pages/login')
})

  const PORT = process.env.PORT || 5000
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
  })