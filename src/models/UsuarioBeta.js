const { DataTypes } = require('sequelize')

module.exports = sequelize => {
    sequelize.define('user-beta', {
        mail: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        userName: {
            type: DataTypes.STRING
        },
        favs: {
            type: DataTypes.ARRAY(DataTypes.STRING)
        },
    })
}