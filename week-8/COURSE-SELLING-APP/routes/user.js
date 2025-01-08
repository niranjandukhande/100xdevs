const {Router} = require("express");
const { userModel, purchaseModel ,courseModel} = require("../db");
const userRouter = Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const {z} = require("zod");
const {JWT_USER_PASSWORD}= require("../config")
const {userMiddleware} = require("../middleware/user")

userRouter.post("/signup",async function(req,res){
    const requiredBody = z.object({
        email: z.string().min(3).max(100).email(),
        password: z.string().min(3).max(30),
        firstName: z.string().min(3).max(100),
        lastName: z.string().min(3).max(100)
    })
    
    const parsedDataWithSuccess = requiredBody.safeParse(req.body);
    if(!parsedDataWithSuccess){
        res.json({
            message: "Incorrect Format"
        })
        return
    }
    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastname;
    
    let errorThrown = false;
    
    try{
        const hashedPassword = await bcrypt.hash(password,5);
        await userModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        });
    }catch(e){
        res.json({
            message: "User already exists"
        })
        console.log(e);
        errorThrown = true;
    }
    
    if(!errorThrown){
        res.json({
            message: "you have successfully signed up"
        })
    }
});

userRouter.post("/signin",async function(req,res){
    const email = req.body.email;
    const password = req.body.password;

    const response = await userModel.findOne({
        email: email
    });

    if(!response){
        res.status(403).json({
            message: "User doesn't exist"
        })
        return
    }

    const passwordMatch = await bcrypt.compare(password,response.password);
    if(passwordMatch){
        const token = jwt.sign({
            id: response._id.toString()
        },JWT_USER_PASSWORD);
        res.json({
            token: token
        })
    }
    else{
        res.status(403).json({
            message: "Invalid credentials"
        })
    }

});

userRouter.get("/purchases",userMiddleware,async function(req,res){
    const userId = req.userId;
    
    const purchases = await purchaseModel.find({
        userId: userId
    })

    const courseData = await courseModel.find({
        _id : {$in : purchases.map(x =>x.courseId)}
    })
    res.json({
        purchases,
        courseData
    })
});

module.exports = {
    userRouter: userRouter
}