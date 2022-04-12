const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  sequelize.define(
    'client',
    {
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
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1990
      },
      favs: {
        type: DataTypes.STRING,
        allowNull: true
      },
      points: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
      }
    },
    {
      timestamps: false
    }
  )
}
