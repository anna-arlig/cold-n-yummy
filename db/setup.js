const {User, Flavor} = require('../models')

User.sync({force: true})
Flavor.sync()