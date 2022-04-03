const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  sequelize.define('userClient', {
    mail: {
      type: DataTypes.STRING,
      allowNull: false
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
