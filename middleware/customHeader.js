const customHeader = (req, res, next) => {
    //console.log(req.body)
    //console.log(req.headers)
    try {
        const apiKey = req.headers.api_key;
        //if(apiKey === 'ric-01') {
        if(apiKey === 'Api-publica-123') {
            next()
        }else {
            res.status(403).send("api key no es correcto")
        }
    }catch(err) {
        res.status(403).send(err)
    }
}

module.exports = customHeader