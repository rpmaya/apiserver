const { tracksModel } = require('../models')
const { handleHttpError } = require('../utils/handleError')
const { matchedData } = require('express-validator')
/**
 * Obtener lista de la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async (req, res) => {
    try{
        const user = req.user //Obtengo trazabilidad del usuario, puedo ver qué solicita, su rol, etc.
        var data
        //(process.env.ENGINE_DB === "nosql") ? data = await tracksModel.find() : data = await tracksModel.findAll()
        data = await tracksModel.findAllData() // findAllData(): custom static function
        res.send({data, user})
    }catch(err){
        console.log(err) //Opcional
        //handleHttpError(res, 'ERROR_GET_ITEMS', 404)
        handleHttpError(res, 'ERROR_GET_ITEMS') //Si nos sirve el de por defecto que hemos establecido, no es necesario pasar el 403
    }
}

/**
 * Obtener un detalle
 * @param {} req 
 * @param {*} res 
 */
const getItem = async (req, res) => {
    try{
        const {id} = matchedData(req) //Me quedo solo con el id
        //const data = await tracksModel.findById(id)
        const data = await tracksModel.findOneData(id)
        res.send(data)
    } catch(err){
        console.log(err)
        handleHttpError(res, "ERROR_GET_ITEM")
    }
}

/**
 * Inserta un registro
 * @param {*} req 
 * @param {*} res 
 */
const createItem = async (req, res) => {
    try {
        //const { body } = req
        //const data = await tracksModel.create(body)
        //res.send(data)

        //express-validator nos provee de la función matchedData
        //const body = req.body //El dato según llega (si hay algún dato de más, nos daría error en el modelo)
        //const bodyClean = matchedData(req) //El dato filtrado por las especificaciones
        //res.send({ body, bodyClean })

        const body = matchedData(req) //Dato filtrado por la definición en el validador
        const data = await tracksModel.create(body);
        res.send(data)    
    }catch(err){
        //console.log(err)
        handleHttpError(res, 'ERROR_CREATE_ITEMS')
    }
}

/**
 * Actualizar un resitro
 * @param {*} req 
 * @param {*} res 
 */
const updateItem = async (req, res) => {
    try {
        const {id, ...body} = matchedData(req) //Extrae el id y el resto lo asigna a la constante body
        const data = await tracksModel.findOneAndUpdate(id, body);
        res.send(data)    
    }catch(err){
        //console.log(err) 
        handleHttpError(res, 'ERROR_UPDATE_ITEMS')
    }
}

/**
 * Eliminar un registro
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = async (req, res) => {
    try {
        const {id} = matchedData(req)
        //const data = await tracksModel.deleteOne({_id:id}); // "deleteOne" realiza el borrado físico en la BD
        const data = await tracksModel.delete({_id:id}); // "delete" realiza el borrado lógico
        res.send(data)    
    }catch(err){
        //console.log(err)
        handleHttpError(res, 'ERROR_DELETE_ITEM')
    }
}


module.exports = { getItems, getItem, createItem, updateItem, deleteItem };