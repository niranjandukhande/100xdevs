const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "secret"
const app = express();
app.use(express.json());

const users = [];

// stateful tokens are not used,instead use jwt's

app.post("/signup",function(req,res){
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username : username,
        password : password
    })

    res.json({
        message: "You are signed in"
    })
})

app.post("/signin",function(req,res){

    const username = req.body.username;
    const password = req.body.password;

    const foundUser = users.find(function(u){
        if(u.username == username && u.password == password){
            return true;
        }
        else{
            return false;
        }
    })

    if(foundUser){
        const token = jwt.sign({
            username : username
        },JWT_SECRET);
        
        // foundUser.token = token;
        // no need to save the above in the db/memory var
        res.json({
            token: token
        })
    }
    else{
        res.status(403).send({
            message: "Invalid username or password"
        })
    }
})

app.get("/me",function(req,res){
    const token = req.headers.token;
    const decodedInformation = jwt.verify(token, JWT_SECRET);
    const username = decodedInformation.username;

    let foundUser = users.find(function(u){
        if(u.username == username){
            return true;
        }
        else{
            res.status(403).send({
                message: "correct token bhejo"
            })
        }
    })
    if(foundUser){
        res.json({
            message: "Hello " + foundUser.username,
            password : foundUser.password
        })
    }
})


app.listen(3000);