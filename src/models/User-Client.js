const { DataTypes } = require('sequelize')

module.exports = sequelize => {
    sequelize.define('user-client', {
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
        },
        birthday: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        favs: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true
        },
        points: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    })
}