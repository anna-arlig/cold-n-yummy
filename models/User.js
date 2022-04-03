const {Model, DataTypes} = require('sequelize')
const bcrypt = require('bcryptjs')

module.exports = database => {

    class User extends Model{
        static async authenticate(email, password){
            const user = await User.findOne({where: {email}})
            if(!user){
                throw new Error('Invalid username')
            }
            if(!bcrypt.compareSync(password, user.password_hash)){
                throw new Error('Invalid password')
            }
            return user
        }
    }
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
                allowNull: false,
                unique: true
            },
            password_hash: {
                type: DataTypes.TEXT,
                allowNull: true,

            }
        }, 
        {
            sequelize: database,
            modelName: 'User',
            hooks: {
                beforeCreate(instance, options){
                    if(instance.password_hash){
                        instance.password_hash =  bcrypt.hashSync(instance.password_hash)
                    }
                }
        }
    }
    )
    return User
}