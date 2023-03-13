const { sequelize } = require("../../config/mysql")
const { DataTypes } = require("sequelize")

const Storage = sequelize.define(
    "storages", //Nombre de la tabla
    {
        url: {
            type: DataTypes.STRING
        },
        filename: {
            type: DataTypes.STRING
        }
    },
    {
        timestamps: true
    }
)

module.exports = Storage