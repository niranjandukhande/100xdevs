const jwt = require("jsonwebtoken");
const jwt_password = "secret";
const zod = require("zod");

const emailSchema = zod.string().email();
const passwordSchema = zod.string().min(6);

function signJwt(username, password){

    const usernameResponse = emailSchema.safeParse(username);
    const passwordResponse = passwordSchema.safeParse(password);

    if(!usernameResponse.success || !passwordResponse.success){
        return null;
    }

    const signature = jwt.sign({
        username
    },jwt_password);
    return signature;
}

function decodeJwt(token){
    const decoded = jwt.decode(token);
    if(decoded){
        return true;
    }
    else{
        return false;
    }
}

// the verify function returns either true or false, if false it throws an error, so -> try catch

// function verifyJwt(token){
//     const verified = jwt.verify(token,jwt_password);
//     if(verified){
//         return true;
//     }
//     else{
//         return false;
//     }
// }

function verifyJwt(token){
    try {
        jwt.verify(token,jwt_password);
        return true;
    } catch (e) {
        console.log(e);
    }
    return false;
}