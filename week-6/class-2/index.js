const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());

const JWT_SECRET = "secret"
const users = []

function auth(req,res,next){
    const token = req.headers.token;
    const decodedData = jwt.verify(token,JWT_SECRET);
    if(!decodedData.username){
        res.json("Login nahi ho tum!!!");
    }
    else{
        req.username = decodedData.username;
        next();
    }
}

app.get("/",function(req,res){
    res.sendFile(__dirname+"/public/index.html");
})

app.post("/signup",function(req,res){
    const username = req.body.username;
    const password = req.body.password;

    //We should check whether user with this username already exists in the database

    users.push({
        username,
        password
    });

    res.json({
        message: "You have successfully signed up!"
    });
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

    if(!foundUser){
        res.json({
            message: "Username aur Password galat hai!!!"
        })
    }
    else{
        const token = jwt.sign({
            username
        },JWT_SECRET)

        res.json({
            token
        })
    }

})

app.get("/me",auth, function(req,res){
    const foundUser = users.find(function(u){
        if(u.username == req.username){
            return true;
        }
        else{
            return false;
        }
    })

    res.json({
        username : foundUser.username,
        password : foundUser.password
    })
})

app.listen(3000);

