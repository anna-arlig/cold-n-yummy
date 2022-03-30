require('dotenv').config()
const express = require('express')
const app = express()
const session = require('express-session')
const bcrypt = require('bcryptjs')

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  }))

  app.get('/', (req, res) => {
      res.render('index')
  })


  const PORT = process.env.PORT || 5000
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
  })