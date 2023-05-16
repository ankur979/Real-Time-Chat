const mongoose = require("mongoose");
const validator = require("validator")

const UserModel = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:[3,"Please enter less then 3 character"]
    },
    username:{
        type:String,
        required:[true,"Please enter username"],
        minLength:[3,"Please enter minimum 3 character"],
        maxLength:[10,"Please enter maximum 10 character"]
    },
    email:{
        type:String,
        validate:[validator.isEmail,"Please enter valid email id"],
        required:[true,"Please enter email id"],
    },
    mobile:{
        type:Number,
    },
    password:{
        type:String,
        minLength:[5,"Please enter minimum 5 character"],
        required:[true,"Please enter password"]
    }
    

})

module.exports = mongoose.model("user",UserModel)