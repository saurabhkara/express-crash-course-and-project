function apiKey(req, res, next){
    const api_key = 1234567;
    console.log(req.query);
    if(req.query.api_keys && (req.query.api_keys ==api_key)){
        next();
    }else{
        res.json({message:'Not Allowed'})
    }
    
}


module.exports = apiKey;