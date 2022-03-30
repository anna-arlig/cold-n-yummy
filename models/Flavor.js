const {Model, DataTypes} = require('sequelize')

module.exports = database => {

    class Flavor extends Model{}
    Flavor.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            name: {
                type: DataTypes.TEXT,
                allowNull: false
            }
        }, 
        {
            sequelize: database,
            modelName: 'Flavor'
        }
    )
    return Flavor
}