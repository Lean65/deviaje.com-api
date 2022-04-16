const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  sequelize.define('pagos', {
    amount: {
      type: DataTypes.STRING
    },
    currency: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false
  })
}