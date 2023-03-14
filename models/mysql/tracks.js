const { sequelize } = require("../../config/mysql")
const { DataTypes } = require("sequelize")
const Storage = require("./Storage")

const Tracks = sequelize.define(
    "tracks", //Nombre de la tabla
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        album: {
            type: DataTypes.STRING
        },
        cover: {
            type: DataTypes.STRING
        },
        artist_name: {
            type: DataTypes.STRING,
        },
        artist_nickname: {
            type: DataTypes.STRING
        },
        artist_nationality: {
            type: DataTypes.STRING
        },
        duration_start: {
            type: DataTypes.INTEGER
        },
        duration_end: {
            type: DataTypes.INTEGER
        },
        mediaId: {
            type: DataTypes.STRING 
        }
    },
    {
        timestamps: true
    }
)

/**
 * Implementando modelo personalizado (los mismos nombres que en noSQL)
 */
Tracks.findAllData = function () {
    Tracks.belongsTo(Storage, {  
        foreignKey: 'mediaId',
        as: "audio"
    })
    return Tracks.findAll({include:'audio'})
}

Tracks.findOneData = function (id) {
    Tracks.belongsTo(Storage, {  
        foreignKey: 'mediaId',
        as: "audio"
    })
    return Tracks.findOne({where:{id: id}, include:'audio'})
}

module.exports = Tracks