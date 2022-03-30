require('dotenv').config()
const Sequelize = require('sequelize')
const setupUser = require('./User')
const setupFlavor = require('./Flavor')

console.log(process.env.DB_PATH)
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DB_PATH
})

const User = setupUser(sequelize)
const Flavor = setupFlavor(sequelize)

module.exports = {User, Flavor}

