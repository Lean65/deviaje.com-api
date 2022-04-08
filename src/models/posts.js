const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  sequelize.define('posts', {
    content: {
      type: DataTypes.STRING
    },
    score: {
        type: DataTypes.INTEGER
    }
  }, {
    timestamps: false
  })
}