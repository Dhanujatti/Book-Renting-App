const rentRoute = require('express').Router()
const rentController = require('../controller/rentController')
const authMiddleware = require('../middleware/authMiddleware')
const authAdmin = require('../middleware/adminAuth')

rentRoute.get("/all",authMiddleware,rentController.getAll)
rentRoute.get("/single/:id",authMiddleware,rentController.getSingle)
rentRoute.post("/create",authMiddleware,authAdmin,rentController.create)
rentRoute.patch("/update/:id",authMiddleware,authAdmin,rentController.update)
rentRoute.delete("/delete/:id",authMiddleware,authAdmin,rentController.delete)

module.exports = rentRoute