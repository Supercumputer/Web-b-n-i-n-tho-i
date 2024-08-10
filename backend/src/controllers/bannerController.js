const Banner = require("../models/bannerModel");

const createBanner = async (req, res, next) => {
  try {
    const { title, image_path } = req.body;

    if (!title || !image_path) {
      return res.status(400).json({ message: "Thiếu thông tin đầu vào." });
    }

    await Banner.create(req.body);

    return res.status(200).json({ message: "Tạo mới thành công." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getBanner = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ message: "Thiếu thông tin id" });
    }

    const data = await Banner.findById({ _id: id });

    if (!data) {
      return res.status(404).json({ message: "Không tìm thấy banner." });
    }

    return res.status(200).json({ data });
  } catch (error) {
    return res.status(200).json({ error: error.message });
  }
};

const getBanners = async (req, res, next) => {
  try {
    const data = await Banner.find();

    if (data.length <= 0) {
      return res.status(404).json({ message: "Không tìm thấy banner." });
    }

    return res.status(200).json({ data });
  } catch (error) {
    return res.status(200).json({ error: error.message });
  }
};

const updateBanner = async (req, res, next) => {
    try {
      const bannerId = req.params.id;
  
      if (!bannerId) {
        return res.status(400).json({ message: "Thiếu thông tin id sản phẩm." });
      }
  
      const updatedBanner = await Banner.findByIdAndUpdate(bannerId, req.body, { new: true });
  
      if (updatedBanner) {
        return res.status(200).json({ message: "Cập nhật sản phẩm thành công.", data: updatedBanner });
      } else {
        return res.status(404).json({ message: "Không tìm thấy sản phẩm." });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

const deleteBanner = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ message: "Thiếu thông tin id." });
    }

    const data = await Banner.deleteOne({ _id: id });

    if (data.deletedCount !== 1) {
      return res.status(404).json({ message: "Xóa banner thất bại." });
    }
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(200).json({ error: error.message });
  }
};

module.exports = {
  createBanner,
  getBanner,
  getBanners,
  deleteBanner,
  updateBanner
};
