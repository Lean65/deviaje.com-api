const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  sequelize.define('client', {
    mail: {
      type: DataTypes.STRING,
      allowNull: false
    },
    verifiedMail: {
      type: DataTypes.BOOLEAN
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    birthday: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    favs: {
      type: DataTypes.STRING,
      allowNull: true
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  })
}
