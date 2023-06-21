const user = require('../model/authModel')
const rent = require('../model/rentModel')
const bcrypt = require('bcryptjs')
const { createLoginToken} = require('../util/token')
const jwt = require('jsonwebtoken')

const authController = {
    register : async (req,res) => {
        try{
            const {name,email,mobile,password} = req.body
            //encrypt the password
            const encPass = await bcrypt.hash(password,10)

            //validation of email
            const extEmail = await user.findOne({ email})
                if(extEmail)
                return res.status(400).json({msg: `${email} already exists.`})

                //validation of mobile number
            const extMobile = await user.findOne({mobile})
            if(extMobile)
                return  res.status(400).json({msg:`${mobile} already exists`})

            const newuser = await user.create({
                name,
                email,
                mobile,
                password: encPass
            })
            res.json({msg: "registered successfully",data: newuser})
        }catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },
    login: async(req,res) => {
        try{
            // res.json({msg:"login called"})
            const {email, password } = req.body

            //user email exists or not
            const extUser = await user.findOne({email})
            if(!extUser)
            return res.status(404).json({msg: `${email} doesn't exists`})

            //compare the passwords
            const isMatch = await bcrypt.compare(password,extUser.password)
            if(!isMatch)
            return res.status(400).json({msg: `Password are not matched..`})
           
           //check if user is active or blocked
           if(!extUser.isActive)
            return res.status(400).json({msg: `Hi, ${extUser.name}, sorry Your account is blocked. Contact Admin`})
            
            //generate login token
            const token = createLoginToken({id: extUser._id})
            
            //save the token in cookies
            res.cookie("logintoken",token ,{
                httpOnly: true,
                signed: true,
                path:"/api/auth/token",
                maxAge: 1 * 24 *60 *60 *1000
            })
            
            res.json({msg: "Login Successful", token})
            
        }catch(err){
            return res.status(500).json({msg:err.message})
        }
    },
    logout: async(req,res) => {
        try{
            res.clearCookie('logintoken',{path:`/api/auth/token`})
            res.json({msg: 'Logout Successfully'})
        }catch(err) {
            return res.status(500).json({msg:err.message})
        }
    },
    currentUser: async(req,res) => {
        try{
            const data = await user.findById({_id: req.user.id}).select('-password')
            if(!data)
                return res.status(404).json({msg:" Requested user not found"})

            res.json({currentUser : data})
        }catch(err){
            res.status(500).json({msg:err.message})
        }
    },
    authToken: async (req,res) => {
        try{
            const cToken = req.signedCookies.logintoken
            if(!cToken)
                 return res.status(404).json({msg:"Token not found... Session Expired"})

                 //verify login token
                 jwt.verify(cToken,process.env.SECRET_TOKEN,(err,user) => {
                    if(err)
                    return res.status(400).json({msg: 'Invalid Token..Un authorized..'})
                    
                    //res.json({user})
                    const rtoken = createLoginToken({ id: user.id })
                    
                    res.json({authToken : rtoken })

                 })
            // res.json({cToken})
        }catch(err) {
            res.status(500).json({msg:err.message})
        }
    },
    allUsers: async( req,res) => {
        try {
            const data = await user.find()

            const users = data.filter(item => item.role !== "superadmin")
            
            return res.status(200).json({ length: users.length, users})
        } catch (err) {
            return res.status(500).json({ msg: err.message})
        }
    },
    blockUser: async(req, res) => {
        try {
            const id = req.params.id

            const users = await user.findById({_id : id})
            if(!users)
                return res.status(400).json({msg: `requested user id not found`})

            await user.findByIdAndUpdate({_id : id},{
                isActive : !user.isActive
            })
            if(user.isActive === true) {
                
                return res.status(200).json({msg: `user blocked successfully`})
            } else{
                return res.status(200).json({msg: `user un-blocked successfully`})

            }
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteUser: async(req, res) => {
        try {
            const id = req.params.id

            const users = await user.findById({_id : id})
            if(!users)
                return res.status(404).json({msg: `requested user id not found`})

            const data = await rent.findOne({userId: id})
            
            if(data){
                return res.status(400).json({msg: 'User have pending rented books. Cannot delete user' })

            } 
            
                await user.findByIdAndDelete({_id: id})
            
                return res.status(200).json({msg: `user deleted successfully`})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = authController;