const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel, TodoModel } = require("./db");
const {auth, jwt_password} = require("./auth")
const {z} = require("zod");

mongoose.connect("YOUR_CONNECTION_URL");


const app = express();
app.use(express.json());

app.post("/signup",async function(req,res){

    //defining schema
    const requiredBody = z.object({
        email: z.toString().min(3).max(100).email(),
        name: z.toString().min(3).max(100),
        password: z.toString().min(3).max(30)
    })

    //using the schema to parse the request's body
    const parsedDataWithSuccess = requiredBody.safeParse(req.body);

    //if not correct format stop and return 
    if(!parsedDataWithSuccess.success){
        res.json({
            message: "Incorrect format"
        })
        return
    }

    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    let errorThrown = false;
    try{
        const hashedPassword = await bcrypt.hash(password,5);
        await UserModel.create({
            email: email,
            password: hashedPassword,
            name: name
        })
    }catch(e){
        res.json("User already exists!");
        errorThrown = true;
    }

    if(!errorThrown){
        res.json({
            message: "You are logged in!"
        })
    }
});

app.post("/signin",async function(req,res){
    const email = req.body.email;
    const password = req.body.password;

    const response = await UserModel.findOne({
        email: email
    });

    if(!response){
        res.status(403).json({
            message: "User does not exist"
        })
        return
    }

    const passwordMatch = await bcrypt.compare(password,response.password);

    if(passwordMatch){
        const token = jwt.sign({
            id: response._id.toString()
        },jwt_password);
        res.json({
            token: token
        })
    }else{
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }
});

app.post("/todo", auth, async function(req,res){
    const userId = req.userId;
    const title = req.body.title;
    const done = req.body.done;

    await TodoModel.create({
        title: title,
        done: done,
        userId : userId
    })

    res.json({
        message: "Todo Created"
    })
});

app.get("/todos", auth, async function(req,res){
    const userId = req.userId;

    const todos = await TodoModel.find({
        userId : userId
    })

    res.json({
        todos
    })
});

app.listen(3000);

