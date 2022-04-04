require('dotenv').config()
const express = require('express')
const app = express()
const session = require('express-session')
const sequelize = require('sequelize')
const {User, Flavor} = require('./models')
const bcrypt = require('bcryptjs')
const { use } = require('express/lib/application')

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(session({
    name: 'session',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  }))

  app.get('/', async (req, res) => {
    const login = req.session.user
    const highscore = await Flavor.findAll({
        attributes:{include: ['name', [sequelize.fn("COUNT", sequelize.col("Users.vote")), "count"]]} ,
        include: [{
          model: User,
          required: true,
        }],       
        group: 'name',
        order: [[sequelize.fn('COUNT', 'vote'), 'DESC']]
    })
    console.log(login)
    res.render('index', {highscore, login})
  })

  app.get('/vote', async (req, res) => {
    const login = req.session.user
    const flavors = await Flavor.findAll({attributes: ['name']})
    res.render('pages/vote', {flavors, login})
  })

  app.post('/submitvote', async (req, res) => {
    try{
      let vote = await Flavor.findOne({
        attributes: ['id'],
        where: {
          name: req.body.flavor
        }
      });

      let email = req.body.email
      const user = await User.findOne({where: {email}})
      if(user){
        if(user.vote){
          req.session.errorMessage = 'You have already voted!'
          res.redirect('/error')
        }
        else{
          await User.update({ vote: vote.id}, {
            where: {
              email: email
            }
          })
        }
        }
      else{
        await User.create({
          email: email, 
          vote: vote.id
          },)
      }
    }catch(error){
    req.session.errorMessage = error.message
    res.redirect('/error')
    }
  
    res.redirect('/thanks')
  })

  app.get('/thanks', (req, res) => {
    const login = req.session.user
      res.render('pages/thanks', {login})
  })

  app.get('/suggest', (req, res) => {
    const login = req.session.user
    res.render('pages/suggest', {login})
  })

app.post('/sendsuggest', async (req, res) => {

  try{
    let email = req.body.email
    const user = await User.findOne({where: {email}})
    if(user){
      if(user.created){
        req.session.errorMessage = 'You have already suggested a flavor!'
        res.redirect('/error')
      }
      else{
        await User.update({ created: true}, {
          where: {
            email: email
          }
        })
        await Flavor.create({name: req.body.suggestion})
      }
      }
    req.session.newflavor = {
      suggestion: req.body.suggestion
    }
    res.redirect('/thankssuggest')
  }catch(error){
    req.session.errorMessage = error.message
    res.redirect('/error')
  } 
})

app.get('/thankssuggest', (req, res) => {
  const login = req.session.user
  res.render('pages/thankssuggest', {newflavor: req.session.newflavor, login})
})

app.get('/login', (req, res) => {
  const login = req.session.user
    res.render('pages/login', {login})
})

app.get('/welcome', (req, res) => {
  const login = req.session.user
  res.render('pages/welcome', {user: req.session.user, login})
})

app.get('/register', (req, res) => {
  const login = req.session.user
  res.render('pages/register', {login})
})

app.get('/logout', (req, res) => {
  const login = req.session.user
  res.render('pages/logout', {login})
})

app.post('/sendlogout', (req, res) => {
  req.session = null
  res.clearCookie('session');
  res.redirect('/')
})

app.post('/sendlogin', async (req, res) => {
  try{
    const {email, password} = req.body
    const user = await User.authenticate(email, password)
    req.session.user = {
      email: user.email,
    }
    res.redirect('/welcome')
  }catch(error){
    req.session.errorMessage = error.message
    res.redirect('/error')
  } 
})

app.post('/sendregistration', async (req, res) => {
  const {email, password} = req.body
  const user = await User.findOne({where: {email}})
  req.session.user = {
    email: email
  }
  if(user){
    await User.update({
      email, 
      password_hash: bcrypt.hashSync(password)
      }, {
        where: {
          email
        }
      })

  }else{
    await User.create({
      email, 
      password_hash: password
    })
  }
  
  res.redirect('/welcome')
})

app.get('/error', (req, res) => {
  const login = req.session.user
  const errorMessage = req.session.errorMessage
  req.session.errorMessage = null
  res.render('pages/error', {login, errorMessage})
})

  const PORT = process.env.PORT || 5000
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
  })