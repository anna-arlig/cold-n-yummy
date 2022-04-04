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
    const highscore = await Flavor.findAll({
        attributes:{include: ['name', [sequelize.fn("COUNT", sequelize.col("Users.vote")), "count"]]} ,
        include: [{
          model: User,
          required: true,
        }],       
        group: 'name',
        order: [[sequelize.fn('COUNT', 'vote'), 'DESC']]
    })

    res.render('index', {highscore})
  })

  app.get('/vote', async (req, res) => {
    const flavors = await Flavor.findAll({attributes: ['name']})
    res.render('pages/vote', {flavors})
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
          res.redirect('/')
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
      console.log(error)
    }
  
    res.redirect('/thanks')
  })

  app.get('/thanks', (req, res) => {
      res.render('pages/thanks')
  })

  app.get('/suggest', (req, res) => {
    res.render('pages/suggest')
  })

app.post('/sendsuggest', (req, res) => {

  try{
    req.session.newflavor = {
      suggestion: req.body.suggestion
    }
    res.redirect('/thankssuggest')
  }catch{
    console.log(error)
    res.redirect('/')
  } 
})

app.get('/thankssuggest', (req, res) => {
  res.render('pages/thankssuggest', {newflavor: req.session.newflavor})
})

app.get('/login', (req, res) => {
    res.render('pages/login')
})

app.get('/welcome', (req, res) => {
  res.render('pages/welcome', {user: req.session.user})
})

app.get('/register', (req, res) => {
  res.render('pages/register')
})

app.get('/logout', (req, res) => {
  res.render('pages/logout')
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
    console.log(error)
    res.redirect('/')
  } 
})

app.post('/sendregistration', async (req, res) => {
  const {email, password} = req.body
  const user = await User.findOne({where: {email}})
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
  req.session.user = {
    email: user.email,
  }
  res.redirect('/welcome')
})

  const PORT = process.env.PORT || 5000
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
  })