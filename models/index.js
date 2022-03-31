require('dotenv').config()
const Sequelize = require('sequelize')
const setupUser = require('./User')
const setupFlavor = require('./Flavor')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DB_PATH
})

const User = setupUser(sequelize)
const Flavor = setupFlavor(sequelize)

Flavor.hasMany(User, {foreignKey: 'vote'})
User.belongsTo(Flavor)

module.exports = {User, Flavor}

