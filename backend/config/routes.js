const express = require('express')
const multer = require('multer')
const upload = multer({ dest: "./upload" })
const {checkSchema}=require('express-validator')
const { authenticateUser,authorizeUser } = require('../app/middleware/authentication')
const userCtrl = require('../app/controllers/userController')

const categoryCtrl = require('../app/controllers/categoryController')

const profileController = require('../app/controllers/profileController')
const { userRegisterValidationSchema, userLoginValidationSchema } = require('../app/helpers/user-validation')

const categoryValidationSchema = require('../app/helpers/category-validation')

const productCltr = require('../app/controllers/productController')
const shipmentctrl = require('../app/controllers/shipmentController')
const router = express.Router()

//User
router.post('/users/register',checkSchema(userRegisterValidationSchema), userCtrl.register)
router.post('/users/login',checkSchema(userLoginValidationSchema), userCtrl.login)
router.get('/users/getUsers',authenticateUser,(req,res,next)=>{
    req.permittedRoles=['admin']
    next()
},authorizeUser,userCtrl.list)
router.get('/users/account', authenticateUser, userCtrl.account)



//Category
router.post('/user/category', authenticateUser,(req,res,next)=>{
    req.permittedRoles=['admin']
    next()
},authorizeUser, categoryCtrl.create)
router.get('/user/category', authenticateUser, categoryCtrl.list)
router.get('/user/category/:id', authenticateUser, categoryCtrl.show)
router.put('/user/category/:id', authenticateUser, categoryCtrl.update)
router.delete('/user/category/:id', authenticateUser, categoryCtrl.destroy)



//Product
router.post('/wms/product',authenticateUser,(req,res,next)=>{
    req.permittedRoles=['admin']
    next()

},authorizeUser,productCltr.create)
router.get('/wms/product',authenticateUser,productCltr.list)
router.put('/wms/product/:id',authenticateUser,productCltr.update)
router.delete('/wms/product/:id',authenticateUser,productCltr.softDelete)
router.get('/wms/deletedProducts',authenticateUser,productCltr.showDeleted)
router.put('/wms/moveToShipment/:id',authenticateUser,productCltr.moveToShipment)
router.get('/wms/restoreProducts/:id',authenticateUser,productCltr.restoreProducts)
router.delete('/wms/permanentDeleteProduct/:id', authenticateUser,(req,res,next)=>{
    req.permittedRoles=['admin']
    next()

},authorizeUser, productCltr.hardDelete)

//Shipment
router.get('/wms/shipments',authenticateUser,shipmentctrl.list)
router.put('/wms/shipments/:id',authenticateUser,shipmentctrl.update)

//Profile
router.put('/user/profile/:id', authenticateUser, upload.single('image'), profileController.update)
router.get('/user/profile', authenticateUser, profileController.show)



module.exports = router