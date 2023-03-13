const { storageModel } = require('../models')
const { handleHttpError } = require('../utils/handleError')
const { matchedData } = require('express-validator')
const fs = require("fs")

const PUBLIC_URL = process.env.PUBLIC_URL
const MEDIA_PATH = __dirname + "/../storage"
/**
 * Obtener lista de la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async (req, res) => {
    try {
        const data = await storageModel.find({})
        res.send(data)
    }catch(err) {
        handleHttpError(res, 'ERROR_LIST_ITEMS')
    }
}

/**
 * Obtener un detalle
 * @param {} req 
 * @param {*} res 
 */
const getItem = async (req, res) => {
    try{
        const {id} = matchedData(req)
        const data = await storageModel.findById(id)
        res.send(data)
    } catch(err){
        //console.log(err)
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
        const { body, file } = req
        const fileData = { 
            filename: file.filename,
            url: process.env.PUBLIC_URL+"/"+file.filename
        }
        const data = await storageModel.create(fileData)
        res.send(data)
    }catch(err) {
        handleHttpError(res, "ERROR_DETAIL_ITEM")
    }
}


/**
 * Eliminar un registro
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = async (req, res) => {
    try{
        const {id} = matchedData(req)
        const dataFile = await storageModel.findById(id)
        await storageModel.deleteOne({_id:id})
        const filePath = MEDIA_PATH + "/" + dataFile.filename
        fs.unlinkSync(filePath)
        const data = {
            filePath,
            deleted: true
        }
        res.send(data)
    } catch(err){
        //console.log(err)
        handleHttpError(res, "ERROR_GET_ITEM")
    }
}


module.exports = { getItems, getItem, createItem, deleteItem };