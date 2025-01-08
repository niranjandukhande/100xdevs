const {Router} = require("express");
const{adminModel,courseModel} = require("../db");
const adminRouter = Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const {z} = require("zod");
const {JWT_ADMIN_PASSWORD} = require("../config")
const {adminMiddleware} = require("../middleware/admin");

adminRouter.post("/signup",async function(req,res){
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
const lastName = req.body.lastName;

let errorThrown = false;

try{
    const hashedPassword = await bcrypt.hash(password,5);
    await adminModel.create({
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

adminRouter.post("/signin",async function(req,res){
    const email = req.body.email;
    const password = req.body.password;

    const response = await adminModel.findOne({
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
        },JWT_ADMIN_PASSWORD);
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

adminRouter.post("/course",adminMiddleware, async function(req,res){
    const adminId = req.userId;
    const {title,description,price,imageUrl} = req.body;

    const course = await courseModel.create({
        title: title,
        description: description,
        price: price,
        imageUrl: imageUrl,
        creatorId: adminId
    })

    res.json({
        message: "Course has been created",
        courseId: course._id
    })

});

adminRouter.put("/course",adminMiddleware,async function(req,res){
    const adminId = req.userId;
    const {title,description,price,imageUrl,courseId} = req.body;

    const course = await courseModel.updateOne({
        _id : courseId,
        creatorId: adminId
    },{
        title: title,
        description: description,
        price: price,
        imageUrl: imageUrl,
    })

    res.json({
        message: "Course Updated",
        courseId: course._id
    })

});

adminRouter.get("/course/bulk",adminMiddleware,async function(req,res){
    const adminId = req.userId;

    const courses = await courseModel.find({
        creatorId: adminId
    })

    res.json({
        courses
    })
});

module.exports = {
    adminRouter:adminRouter
}