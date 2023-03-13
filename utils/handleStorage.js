const multer = require("multer")

const storage = multer.diskStorage({
    destination:function(req, file, callback){ //Pasan argumentos automáticamente
        const pathStorage = __dirname+"/../storage" //Se llevaría a S3 de AWS por ejemplo
        callback(null, pathStorage) //error y destination
    },
    filename:function(req, file, callback){ //Sobreescribimos o renombramos
        //Tienen extensión jpg, pdf, mp4
        const ext = file.originalname.split(".").pop() //el último valor
        const filename = "file-"+Date.now()+"."+ext
        callback(null, filename)
    }
})
//Middleware en la ruta y el controlador
const uploadMiddleware = multer({storage})

module.exports = uploadMiddleware