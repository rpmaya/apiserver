const express = require("express")
const { registerCtrl, loginCtrl, updateUser, getUsers } = require("../controllers/auth")
const {validatorRegister, validatorLogin, validatorGetUser, validatorUpdate} = require("../validators/auth")
const authMiddleware = require("../middleware/session")
const checkRol = require("../middleware/rol")
const router = express.Router()

/**
 * @openapi
 * /api/auth/users:
 *  get:
 *      tags:
 *      - User
 *      summary: Get users in the System
 *      description: ''
 *      responses:
 *          '200':
 *              description: Returns the users
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.get("/users", authMiddleware, getUsers)

/**
 * @openapi
 * /api/auth/register:
 *  post:
 *      tags:
 *      - User
 *      summary: User register
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
 */
router.post("/register", validatorRegister, registerCtrl)

/**
 * @openapi
 * /api/auth/login:
 *  post:
 *      tags:
 *      - User
 *      summary: Login user
 *      description: ''
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/login"
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '401':
 *              description: Validation error
 */
router.post("/login", validatorLogin, loginCtrl) 

/**
 * @openapi
 * /api/auth/update/{id}:
 *  put:
 *      tags:
 *      - User
 *      summary: Update user
 *      description: Update a user by an admin
 *      parameters:
 *          -   name: id
 *              in: path
 *              description: id that need to be updated
 *              required: true
 *              schema:
 *                  type: string
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
router.put("/update/:id", authMiddleware, checkRol(["admin"]), validatorGetUser, validatorUpdate, updateUser)

module.exports = router
