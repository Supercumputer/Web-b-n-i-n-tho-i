const Orders = require("../models/order");
const Users = require("../models/userModel");
const createOrder = async (req, res, next) => {
  try {
    const id = req.user.id;

    const { products, total, address } = req.body;

    if (!products || !total || !address) {
      return res.status(400).json({ message: "Missing input." });
    }

    const data = {products, total}

    if(req.body.status){
      data.status = req.body.status
    }

    await Users.findByIdAndUpdate({ _id: id }, { address: address }, { new: true });

    await Orders.create({ ...data, userId: id });

    return res
      .status(201)
      .json({ success: true, message: "Tạo order thành công." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getPost = async (req, res, next) => {
  try {
    const slug = req.params.slug;

    if (!slug) {
      return res.status(400).json({ message: "Thiếu thông tin id post." });
    }

    const data = await Posts.findOneAndUpdate(
      { slug },
      { $inc: { view: 1 } },
      { new: true }
    ).populate({
      path: "comment.userId",
      select: "avata userName lastName firstName",
    });

    if (data) {
      return res.status(200).json({ success: true, data });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy bài post." });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getPosts = async (req, res, next) => {
  try {
    const data = await Posts.find();

    if (data) {
      return res.status(200).json({ success: true, data });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy bài post." });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deletePost = async (req, res, next) => {
  try {
    const slug = req.params.id;

    if (!slug) {
      return res.status(400).json({ message: "Thiếu thông tin id bài post." });
    }

    const data = await Posts.findByIdAndDelete(slug);

    if (data) {
      return res.status(200).json({ message: "Xóa bài post thành công." });
    } else {
      return res.status(404).json({ message: "Không tìm thấy bài post." });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updatePost = async (req, res, next) => {
  try {
    const slug = req.params.id;

    if (!slug) {
      return res.status(400).json({ message: "Thiếu thông tin id bài post." });
    }

    const data = await Product.findByIdAndUpdate(slug, req.body, {
      new: true,
    });

    if (data) {
      return res.status(200).json({
        message: "Cập nhật bài post thành công.",
        data: data,
      });
    } else {
      return res.status(404).json({ message: "Không tìm thấy bài post." });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateHeart = async (req, res, next) => {
  try {
    const id = req.user.id;

    const idPost = req.params.id;

    if (!idPost) {
      return res.status(400).json({ message: "Thiếu thông tin id bài post." });
    }

    const post = await Posts.findById({ _id: idPost });

    const heartPost = post.heart.find((item) => item.toString() === id);

    if (!heartPost) {
      post.totalheart += 1;
      post.heart.push(id);
    } else {
      post.totalheart -= 1;
      post.heart.pull(id);
    }
    await post.save();

    const data = await Posts.findById({ _id: idPost }).populate({
      path: "comment.userId",
      select: "avata userName lastName firstName",
    });

    return res
      .status(200)
      .json({ success: true, message: "Update heart thành công.", data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createOrder,
};
