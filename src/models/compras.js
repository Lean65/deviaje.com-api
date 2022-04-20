const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  sequelize.define('compras', {
    value: {
        type: DataTypes.INTEGER
    }, 
  }, {
    timestamps: false
  })
}
