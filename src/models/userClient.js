const { DataTypes } = require('sequelize')
module.exports = sequelize => {
  sequelize.define('client', {
    mail: {
      type: DataTypes.STRING,
      allowNull: false
    },
    verifiedmail: {
      type: DataTypes.BOOLEAN
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    birthday: {
      type: DataTypes.STRING,
      allowNull: true
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    dni: {
      type: DataTypes.STRING
    },
    phonenumber: {
      type: DataTypes.STRING
    },
    country: {
      type: DataTypes.STRING
    },
    state: {
      type: DataTypes.STRING
    },
    city: {
      type: DataTypes.STRING
    },
  }, {
    timestamps: false
  })
}
