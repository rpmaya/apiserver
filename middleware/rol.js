const { handleHttpError } = require("../utils/handleError")
/**
 * Array con los roles permitidos
 * @param {*} roles
 * @returns 
 */
const checkRol = (roles) => (req, res, next) => { //Doble argumento
    try{
        const {user} = req
        const userRol = user.role
        //Comprobamos que el rol del usuario esté en roles
        const checkValueRol = roles.includes(userRol)
        if (!checkValueRol) {
            handleHttpError(res, "NOT_ALLOWED", 403)
            return
        }
        next()
    }catch(err){
        handleHttpError(res, "ERROR_PERMISSIONS", 403)
    }
}

module.exports = checkRol