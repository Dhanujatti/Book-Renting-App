const express = require('express')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const cors = require('cors')
const connectdb = require('./db/authConnect')
const port = process.env.port

const app = express()

//body parser setting
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//middlewares
app.use(cors()) // cross origin resource sharing to allow incoming requests(from front to backend )
app.use(cookieParser(process.env.SECRET_TOKEN)) //configure secured cookies

//index route
app.use('/api/auth',require('./route/authRoute'))
app.use('/api/category',require('./route/categoryRoute'))
app.use('/api/book',require('./route/bookRoute'))
app.use('/api/rent',require('./route/rentRoute'))

//default route
app.all('**',async(req,res) =>{

    return res.status(404).json({msg:'Requested path not found... 404 error'})
})
//to start the server
app.listen(port, async() =>{
    console.log(`server is connected @ http://localhost:${port}`)
    await connectdb()
})

