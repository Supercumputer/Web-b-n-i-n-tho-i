const express = require("express");
const router = express.Router();
const {checkToken, checkPermistion} = require('../middlewares/jwtAction')
const post = require("../controllers/postController");

router.get("/getposts", post.getPosts);
router.get("/getpost/:slug", post.getPost);
router.put("/updateheart/:id", checkToken, post.updateHeart);

router.all('*', checkToken, checkPermistion)
router.post("/createpost", post.createPost);
router.delete("/deletepost/:id", post.deletePost);
router.put("/updatepost/:id", post.updatePost);


module.exports = router;
