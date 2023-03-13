const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")

//No necesita validatorCreateItem porque ya está haciendo uso de Multer

const validatorGetItem = [
    check("id").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

module.exports = { validatorGetItem }