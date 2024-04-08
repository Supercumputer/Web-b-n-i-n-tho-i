const express = require("express");
const router = express.Router();
const { checkToken, checkPermistion } = require("../middlewares/jwtAction");
const fileUploader = require('../config/cloudinary.config')
const user = require("../controllers/userController");

router.get("/getAcount", checkToken, user.getAcount);
router.get("/refreshtoken", user.refreshToken);

router.put("/updateuser", checkToken, fileUploader.single('image'), user.updateUser);
router.put("/updatecart", checkToken, user.updateCart);
router.delete("/deletecarts/:id",checkToken, user.deleteCarts);
router.delete("/deletecart/:id",checkToken, user.deleteCart);
router.get("/getuser/:id",checkToken, user.getUser);

router.all("*", checkToken, checkPermistion);
router.post("/createuser", user.createUser);
router.get("/getusers", user.getUsers);
router.delete("/deleteuser/:id", user.deleteUser);

module.exports = router;
