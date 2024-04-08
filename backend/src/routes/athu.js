const express = require('express')
const router = express.Router()

const athu = require('../controllers/athuController')

router.post('/login', athu.login)
router.post('/register', athu.register)
router.post('/logout', athu.logout)



module.exports = router