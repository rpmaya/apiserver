const express = require("express")
const { registerCtrl, loginCtrl, updateUser, getUsers } = require("../controllers/auth")
const {validatorRegister, validatorLogin, validatorGetUser, validatorUpdate} = require("../validators/auth")
const authMiddleware = require("../middleware/session")
const checkRol = require("../middleware/rol")
const router = express.Router()


router.get("/users", authMiddleware, getUsers)

/**
 * POST http://localhost:3000/api/auth/register
 * @openapi
 * /api/auth/register:
 *  post:
 *      tags:
 *      - User
 *      summary: "User registter"
 *      description: Register a new user
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/user"
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '401':
 *              description: Validation error
 *      security:
 *          - bearerAuth: []
 */
router.post("/register", validatorRegister, registerCtrl)

//POST http://localhost:3000/api/auth/login
router.post("/login", validatorLogin, loginCtrl) 

//PUT http://localhost:3000/api/auth/update/<id>
router.put("/update/:id", authMiddleware, checkRol(["admin"]), validatorGetUser, validatorUpdate, updateUser)

module.exports = router
