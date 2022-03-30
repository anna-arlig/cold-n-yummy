const Sequelize = require('sequelize')
const setupUser = require('./User')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:'
})

