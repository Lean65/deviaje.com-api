const { DataTypes } = require('sequelize')

module.exports = sequelize => {
    sequelize.define('user-client', {
        mail: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        userName: {
            type: DataTypes.STRING
        },
        birthday: {
            type: DataTypes.INTEGER
        },
        favs: {
            type: DataTypes.ARRAY(DataTypes.STRING)
        },
        points: {
            type: DataTypes.INTEGER
        }
    })
}