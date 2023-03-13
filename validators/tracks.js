const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")

var validatorCreateItem = [];

if (process.env.ENGINE_DB === "nosql") {
    validatorCreateItem = [
        check("name").exists().notEmpty(), //.isLength(min:5, max:90)
        check("album").exists().notEmpty(),
        check("cover").exists().notEmpty(),
        check("artist").exists().notEmpty(),
        check("artist.name").exists().notEmpty(),
        check("artist.nickname").exists().notEmpty(),
        check("artist.nationality").exists().notEmpty(),
        check("duration.start").exists().notEmpty().isInt(),
        check("duration.end").exists().notEmpty().isInt(),
        check("mediaId").exists().notEmpty(),
        //Middleware tiene que responder después de la petición
        (req, res, next) => {
            return validateResults(req, res, next)
        }
        //(req, res, next) => validateResults(req, res, next) // Otra forma de invocarlo
    ]
} else {
    validatorCreateItem = [
        check("name").exists().notEmpty(), //.isLength(min:5, max:90)
        check("album").exists().notEmpty(),
        check("cover").exists().notEmpty(),
        check("artist_name").exists().notEmpty(),
        check("artist_nickname").exists().notEmpty(),
        check("artist_nationality").exists().notEmpty(),
        check("duration_start").exists().notEmpty().isInt(),
        check("duration_end").exists().notEmpty().isInt(),
        check("mediaId").exists().notEmpty(),
        //Middleware tiene que responder después de la petición
        (req, res, next) => {
            return validateResults(req, res, next)
        }
    ]
}


const validatorGetItem = [
    check("id").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

module.exports = { validatorCreateItem, validatorGetItem }