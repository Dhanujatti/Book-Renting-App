const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    desc:{
        type: String,
        required: true,
        trim: true
    },
    price:{
        type: Number,
        required: true,
    },
    author:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    pages:{
        type: Number,
        required: true,
    },
    rentCost:{
        type:Number,
        required:true
    },
    isAvailable:{
        type: Boolean,
        default: true
    },
    numberOfCopy:{
        type:Number,
        required: true
    },
    rentedCopies:{
        type: Number,
        default:0
    },
    isbn:{
        type: String,
        default:""
    },
    image:{
        type:Object,
        default:{
            url:"https://th.bing.com/th/id/OIP.se3DXw-mPQ4LPJvFU33pQgAAAA?pid=ImgDet&rs=1"
        }
    },
    isActive:{
        type: Boolean,
        required: true,
    }
},{
    collection:"books",
    timestamps:true
})

module.exports = mongoose.model("Book", bookSchema)