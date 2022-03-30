require('dotenv').config()
const express = require('express')
const app = express()
const session = require('express-session')
const bcrypt = require('bcryptjs')

app.set('view engine', 'ejs')

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  }))






  const PORT = process.env.PORT || 5000
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
  })