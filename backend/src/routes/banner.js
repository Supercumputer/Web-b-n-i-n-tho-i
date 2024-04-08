const express = require("express");
const router = express.Router();

const banner = require("../controllers/bannerController");

router.post("/createbanner", banner.createBanner);
router.get("/getbanner/:id", banner.getBanner);
router.get("/getbanners", banner.getBanners);
router.put("/updatebanner/:id", banner.updateBanner);
router.delete("/deletebanner/:id", banner.deleteBanner);

module.exports = router;
