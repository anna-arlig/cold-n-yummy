const {Model, DataTypes} = require('sequelize')

module.exports = database => {

    class User extends Model{}
    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            email: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            vote: {
                type: DataTypes.TEXT,
                allowNull: true
            }
        }, 
        {
            sequelize: database,
            modelName: 'User'
        }
    )
    return User
}