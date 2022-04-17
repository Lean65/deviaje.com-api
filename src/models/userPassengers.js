const { DataTypes } = require('sequelize')
module.exports = sequelize => {
  sequelize.define(
    'passenger',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false
      },
      birthday: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      document: {
        type: DataTypes.CHAR
      }
    },
    {
      timestamps: false
    }
  )
}
