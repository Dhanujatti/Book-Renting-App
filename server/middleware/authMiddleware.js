const jwt = require('jsonwebtoken')

const authMiddleware = async (req,res,next)=> {
  try {
      //headers
      const Token = req.header("Authorization")

      jwt.verify(Token, process.env.SECRET_TOKEN,(err,user)=>{
        if(err)
        return res.status(404).json({msg: 'Un Authorized token'})
        
        // res.json({user})
        req.user = user //assigning to request variable
        next() //send the data to next controller
      })
    
    // res.json({msg:"Auth middleware called", Token})


  } catch (err) {
    
    return res.status(500).json({msg: err.message})
  }  
}

module.exports = authMiddleware;