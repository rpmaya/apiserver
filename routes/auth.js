const express = require("express")
const { registerCtrl, loginCtrl, updateUser } = require("../controllers/auth")
const {validatorRegister, validatorLogin, validatorGetUser, validatorUpdate} = require("../validators/auth")
const authMiddleware = require("../middleware/session")
const checkRol = require("../middleware/rol")
const router = express.Router()


//POST http://localhost:3000/api/auth/register
router.post("/register", validatorRegister, registerCtrl)

//POST http://localhost:3000/api/auth/login
router.post("/login", validatorLogin, loginCtrl) 

//PUT http://localhost:3000/api/auth/update/<id>
router.put("/update/:id", authMiddleware, checkRol(["admin"]), validatorGetUser, validatorUpdate, updateUser)

module.exports = router
