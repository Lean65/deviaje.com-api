const { DataTypes } = require('sequelize')
module.exports = sequelize => {
  sequelize.define(
    'fly',
    {
      departure: {
        type: DataTypes.STRING
      },
      arrival: {
        type: DataTypes.STRING
      },
      date: {
        type: DataTypes.STRING
      },
      cityD: {
        type: DataTypes.STRING
      },
      cityA: {
        type: DataTypes.STRING
      },
      timeD: {
        type: DataTypes.STRING
      },
      timeA: {
        type: DataTypes.STRING
      },
      duration: {
        type: DataTypes.STRING
      }
    }
    // ,
    // {
    //   timestamps: false
    // }
  )
}
