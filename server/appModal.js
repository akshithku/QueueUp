const mongoose = require("mongoose");

const Shcema = mongoose.Schema
({
        Docimg:{
            type:String,
            required:true
        },
        name:{
            type:String,
            required:true
        },
        specialist:{
            type:String,
            required:true
        },
        timings:{
            type:Number,
            required:true
        },
        count:{
            type:Number,
            required:true
        }
})

module.exports=mongoose.model('tokenNum', Shcema)