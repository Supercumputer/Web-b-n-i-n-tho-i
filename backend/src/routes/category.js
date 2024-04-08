const express = require('express')
const router = express.Router()

const category = require('../controllers/categoryController')

router.post('/createcategory', category.createCategory)
router.get('/getcategory/:id', category.getCategory)
router.get('/getcategorys', category.getCategorys)
router.delete('/deletecategory/:id', category.deleteCategory)

module.exports = router