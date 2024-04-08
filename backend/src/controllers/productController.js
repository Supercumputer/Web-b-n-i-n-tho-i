require("dotenv").config();
const Product = require("../models/productModel");

const createProduct = async (req, res, next) => {
  try {
    const { title, description, price } = req.body;

    if (!title || !description || !price) {
      return res.status(400).json({ message: "Thiếu thông tin id sản phẩm." });
    }

    const newProduct = await Product.create(req.body);

    return res
      .status(201)
      .json({ message: "Tạo sản phẩm thành công.", data: newProduct });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Lấy thông tin một sản phẩm
const getProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;

    if (!productId) {
      return res.status(400).json({ message: "Thiếu thông tin id sản phẩm." });
    }

    const product = await Product.findById(productId).populate({
      path: "ratings.postedBy",
      select: "avata userName lastName firstName",
    });
    
    if (product) {
      return res.status(200).json({ data: product });
    } else {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm." });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Lấy danh sách tất cả sản phẩm
const getProducts = async (req, res, next) => {
  try {
    //  Filtering
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // Advanced filtering
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
    const formatedQuery = JSON.parse(queryString);

    if (queryObj?.title)
      formatedQuery.title = { $regex: queryObj.title, $options: "i" };

    if (queryObj?.color && queryObj?.color?.length > 0) {
      formatedQuery.color = { $in: queryObj?.color };
    }

    if (queryObj?.size && queryObj?.size?.length > 0) {
      formatedQuery.size = { $in: queryObj?.size };
    }

    if (queryObj?.category) {
      formatedQuery.category = queryObj.category;
    }

    const totalResults = await Product.countDocuments(formatedQuery);

    let query = Product.find(formatedQuery);

    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    //fields Lay ra truong nao va ko lay ra truong nao
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    }

    //pagination
    let page = req.query.page || 1;
    let pageSize = req.query.limit || process.env.PAGE_SIZE;
    let skipItem = (page - 1) * pageSize;
    query = query.skip(skipItem).limit(pageSize);

    let totalPages = Math.ceil(totalResults / pageSize);

    const tours = await query;
    res.status(200).json({
      status: "success",
      results: tours.length,
      totalPages,
      data: {
        tours,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Cập nhật thông tin một sản phẩm
const updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;

    if (!productId) {
      return res.status(400).json({ message: "Thiếu thông tin id sản phẩm." });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      req.body,
      { new: true }
    );

    if (updatedProduct) {
      return res.status(200).json({
        message: "Cập nhật sản phẩm thành công.",
        data: updatedProduct,
      });
    } else {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm." });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Xóa một sản phẩm
const deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;

    if (!productId) {
      return res.status(400).json({ message: "Thiếu thông tin id sản phẩm." });
    }

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (deletedProduct) {
      return res.status(200).json({ message: "Xóa sản phẩm thành công." });
    } else {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm." });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const ratingProduct = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { start, comment, id: idsp } = req.body;

    if (!start || !idsp) {
      return res.status(400).json({ message: "Missing inputs" });
    }

    const filter = { _id: idsp, "ratings.postedBy": id };
    const update = {
      $set: {
        "ratings.$.start": start,
        "ratings.$.comment": comment,
      },
    };
    const options = { new: true };

    const updatedProduct = await Product.findOneAndUpdate(
      filter,
      update,
      options
    );

    if (!updatedProduct) {
      // If the product is not found, it means the user hasn't rated it before.
      // In this case, add a new rating.
      await Product.findByIdAndUpdate(
        { _id: idsp },
        { $push: { ratings: { start, comment, postedBy: id } } },
        { new: true }
      );
    } else {
      const ratingCount = updatedProduct.ratings.length;
      const sumRating = updatedProduct.ratings.reduce(
        (total, item) => total + +item.start,
        0
      );
      updatedProduct.totalRating =
        Math.round((sumRating * 10) / ratingCount) / 10;
      await updatedProduct.save();
    }

    return res.status(200).json({sucess: true, message: "Rating success." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  ratingProduct,
};
