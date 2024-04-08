const express = require("express");
const router = express.Router();
const {checkToken, checkPermistion} = require('../middlewares/jwtAction')
const order = require("../controllers/orderController");

router.post("/createorder", checkToken, order.createOrder);
router.all('*', checkToken, checkPermistion)



module.exports = router;
