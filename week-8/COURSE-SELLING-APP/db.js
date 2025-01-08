const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const UserSchema = new Schema({
    email: {type:String,unique: true},
    password: String,
    firstName: String,
    lastName: String
})

const CourseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: ObjectId
})

const AdminSchema = new Schema({
    email: {type:String,unique: true},
    password: String,
    firstName: String,
    lastName: String
})

const PurchasesSchema = new Schema({
    courseId: ObjectId,
    userId: ObjectId
})

const userModel = mongoose.model("users",UserSchema);
const courseModel = mongoose.model("courses",CourseSchema);
const adminModel = mongoose.model("admins",AdminSchema);
const purchaseModel = mongoose.model("purchases",PurchasesSchema);

module.exports = {
    userModel,
    courseModel,
    adminModel,
    purchaseModel
}