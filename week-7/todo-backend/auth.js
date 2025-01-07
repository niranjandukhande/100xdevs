const jwt = require("jsonwebtoken");
const jwt_password = "secret";


function auth (req,res,next){
    const token = req.headers.token;

    const decodedData = jwt.verify(token,jwt_password);

    if(decodedData){
        req.userId = decodedData.id;
        next();
    }
    else{
        res.status(403).json({
            message: "Invalid Credentials"
        })
    }
}

module.exports = {
    auth,
    jwt_password
}