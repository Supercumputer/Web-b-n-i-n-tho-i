const express = require('express')
const router = express.Router()
const { checkToken, checkPermistion } = require("../middlewares/jwtAction");
const product = require('../controllers/productController')

router.get('/getproduct/:id', product.getProduct)
router.get('/getproducts', product.getProducts)
router.post('/ratingproduct', checkToken, product.ratingProduct)

router.all('*', checkToken, checkPermistion)
router.post('/createproduct', product.createProduct)
router.put('/updateproduct/:id', product.updateProduct)
router.delete('/deleteproduct/:id', product.deleteProduct)
module.exports = router