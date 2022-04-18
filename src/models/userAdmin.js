const { DataTypes, Model } = require('sequelize')

class User extends Model {}

module.exports = sequelize => User.init({
  mail: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
    sequelize,
    timestamps: false,
    modelName: 'admin'
})