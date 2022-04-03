const { DataTypes } = require('sequelize')

module.exports = sequelize => {
    sequelize.define('userAdmin', {
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
        }
    })
}