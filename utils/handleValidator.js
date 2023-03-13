const { validationResult } = require("express-validator")

const validateResults = (req, res, next) => {
    try {
        validationResult(req).throw() // Valida lo que le hemos indicado
        return next() // Si no existe error con la validación se lo enviamos al siguiente (al controlador)
    } catch (err) {
        res.status(403) // Por ahora lo dejamos como no permitido
        res.send(err)
    }
}

module.exports = validateResults