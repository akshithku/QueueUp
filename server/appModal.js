const mongoose = require("mongoose");

const Shcema = mongoose.Schema
({
        Name:{
            type:String,
            // required:true
        },
        DoctorName:{
            type:String,
            // required:true
        },
        timings:{
            type:String,
            // required:true
        },
        Amount:{
            type:Number,
            // required:true
        },
        ReferenceCode:{
            type:String,
            // required:true
        },
        Doc_id:{
            type:String,
            // required:true,/
        },
        UserEmail:{
            type:String,
            // required:true,
        }
})

const DocSlot=mongoose.model('DocSlot', Shcema)

module.exports=DocSlot;