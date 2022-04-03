const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  sequelize.define('userBusiness', {
    mail: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    userName: {
      type: DataTypes.STRING
    }
  })
}
