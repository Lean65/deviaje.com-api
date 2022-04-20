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
        type: DataTypes.BOOLEAN,
        defaultValue: false
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
        defaultValue: 'dd/mm/aaaa'
      },
      points: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      category: {
        type: DataTypes.STRING,
        defaultValue: '*'
      },
      dni: {
        type: DataTypes.STRING,
        defaultValue: '---'
      },
      phonenumber: {
        type: DataTypes.STRING,
        defaultValue: '---'
      },
      country: {
        type: DataTypes.STRING,
        defaultValue: '---'
      },
      state: {
        type: DataTypes.STRING,
        defaultValue: '---'
      },
      city: {
        type: DataTypes.STRING,
        defaultValue: '---'
      }
    },{
    timestamps: false
  })
}
