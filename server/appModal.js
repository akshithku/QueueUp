const mongoose = require("mongoose");

const Shcema = mongoose.Schema
({
    Name: {
        type: String,
        required: true
    },
    DoctorName: {
        type: String,
        required: true
    },
    timings: {
        type: String,
        required: true
    },
    Doc_id: {
        type: String,
        required: true
    },
    UserEmail: {
        type: String,
        required: true
    },
    orderId: {  // Razorpay Order ID
        type: String
    },
    paymentId: {  // Razorpay Transaction ID
        type: String
    },
    paymentStatus: { // Payment Status: Pending, Success, Failed
        type: String,
        enum: ["Pending", "Success", "Failed"],
        default: "Pending"
    }
})

const DocSlot=mongoose.model('DocSlot', Shcema)

module.exports=DocSlot;

