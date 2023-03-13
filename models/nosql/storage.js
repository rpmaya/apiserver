const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete")

const StorageScheme = new mongoose.Schema(
    {
        url: {
            type: String
        },
        filename: {
            type: String
        }
    },
    {
        timestamps: true, // TODO createdAt, updatedAt
        versionKey: false
    }
)
StorageScheme.plugin(mongooseDelete, {overrideMethods: "all"})
module.exports = mongoose.model("storages", StorageScheme) // Nombre de la colección (o de la tabla en SQL)