const mongoose = require('mongoose')

const rentSchema = new mongoose.Schema({
    bookId:{
        type:mongoose.Types.ObjectId,
        ref:'Book',
        required:true
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    rentDate:{
        type: String,
        default:new Date().toLocaleDateString()
    },
    returnDate:{
        type:Date,
        required:true
    },
    paymentStatus:{
        type:String,
        enum:["paid","unpaid"],
        default:"Unpaid"
    },
    book:{
        type: Object,
        default:{}
    },
    user:{
        type: Object,
        default:{}
    }
},{
    collection:'rent',
    timestamps: true
})

module.exports = mongoose.model('Rent',rentSchema)