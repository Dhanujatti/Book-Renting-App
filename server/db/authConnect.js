const mongoose = require('mongoose');

const connectdb = async ()=>{
    await mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('mongoDb connected successfully')
    })
    .catch(err => console.log(err.message))
}
module.exports = connectdb