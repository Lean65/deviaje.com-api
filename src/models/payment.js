const { DataTypes } = require('sequelize')
module.exports = sequelize => {
  sequelize.define(
    'payment',
    {
      mail: {
        type: DataTypes.STRING,
        allowNull: false
      },
      monto: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      address: {
        type: DataTypes.JSON,
        allowNull: true
      }
    },
    {
      timestamps: false
    }
  )
}
