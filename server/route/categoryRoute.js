const categoryRoute = require('express').Router()
const categoryCtrl = require('../controller/categoryController')
const authMiddleware = require('../middleware/authMiddleware')
const adminauth = require('../middleware/adminAuth')

categoryRoute.get("/all", authMiddleware,adminauth, categoryCtrl.getAll)
categoryRoute.get("/single/:id",authMiddleware,adminauth,categoryCtrl.getsingle)
categoryRoute.post("/create",authMiddleware,adminauth, categoryCtrl.Create)
categoryRoute.patch('/update/:id',authMiddleware,adminauth,categoryCtrl.Update)
categoryRoute.delete('/delete/:id',authMiddleware,adminauth,categoryCtrl.delete)

module.exports = categoryRoute