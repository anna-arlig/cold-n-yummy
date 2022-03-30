const {User, Flavor} = require('../models')

User.destroy({where: {}})
Flavor.destroy({where: {}})

Flavor.bulkCreate([{name: 'Chocolate'}, {name: 'Strawberry'}, {name: 'Rum raisin'}, {name: 'Cherry'}, {name: 'Lemon'}, {name: 'Liquorice'}, {name: 'Blueberry'}, {name: 'Mint chocolate'}, {name: 'Coconut'}, {name: 'Cloudberry'}])