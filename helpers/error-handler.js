function errorHandler(err, req, res, next){
    //jwt auth aerrror
    if(err.name==='UnauthorizedError'){
        res.status(401).json({message:"User is not Authorized"});
    }

    //validation error
    if(err.name==='ValidationError'){
        res.status(401).json({message:err});
    }
    //general error
    return res.status(500).json(err);

}

module.exports=errorHandler;