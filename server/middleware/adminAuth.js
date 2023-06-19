const user = require('../model/authModel')

const adminAuth = async(req,res,next) => {
    try {
        const id = req.user.id //get the id from authmiddleware

        const extuser = await user.findById({_id: id})
        if(!extuser)
            return res.status(404).json({msg:'user id not found'})

            //validate role
            if(extuser.role !== "superadmin" )
                return res.status(400).json({msg : `Access denied for non-admin users..`})

            next() //if admin continue to next controller
    } catch (err) {
        return res.status(500).json({msg : err.message})
    }
}

module.exports = adminAuth