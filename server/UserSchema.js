const mongoose = require("mongoose");

const UserSchema= mongoose.Schema({
    DoctorName:{
        type: String,
        required:true
    },
    HospitalName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    Specialty:{
        type:String,
        required:true
    }
})

const User=mongoose.model("User",UserSchema);

module.exports=User;