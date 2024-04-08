const User = require("../models/userModel");
const { verifyToken, generateAccessToken } = require("../service/authService");

const createUser = async (req, res, next) => {
  try {
    const { firstName, email, password } = req.body;

    if (!firstName || !email || !password) {
      return res.status(400).json({ message: "Thiếu thông tin đầu vào." });
    }

    const newUser = await User.create(req.body);

    return res
      .status(201)
      .json({ message: "Tạo người dùng thành công.", data: newUser });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res
        .status(400)
        .json({ message: "Thiếu thông tin id người dùng." });
    }

    const user = await User.findById(userId).populate({
      path: "cart.product",
      select: "-size -color -createdAt -updatedAt",
    });

    if (user) {
      return res.status(200).json({ data: user });
    } else {
      return res.status(404).json({ message: "Không tìm thấy người dùng." });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    return res.status(200).json({ data: users });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const pathImg = req.file && req.file.path;

    if (!userId) {
      return res
        .status(400)
        .json({ message: "Thiếu thông tin id người dùng." });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { ...req.body, avata: pathImg },
      {
        new: true,
      }
    );

    if (updatedUser) {
      return res.status(200).json({
        message: "Cập nhật người dùng thành công.",
        data: updatedUser,
        success: true,
      });
    } else {
      return res.status(404).json({ message: "Không tìm thấy người dùng." });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res
        .status(400)
        .json({ message: "Thiếu thông tin id người dùng." });
    }

    const deletedUser = await User.findByIdAndDelete(userId);

    if (deletedUser) {
      return res.status(200).json({ message: "Xóa người dùng thành công." });
    } else {
      return res.status(404).json({ message: "Không tìm thấy người dùng." });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAcount = async (req, res, next) => {
  try {
    const { id } = req.user;
    const userData = await User.findById({ _id: id }).select(
      "-password -role -refreshToken"
    );

    return res.status(200).json({
      userData,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const cookie = req.cookies;

    if (!cookie) {
      return res.status(400).json({ message: "Cookie không tồn tại." });
    }

    const tokenId = verifyToken(cookie.JWT);

    if (!tokenId) {
      return res.status(400).json({ message: "Token id không tồn tại." });
    }

    const data = await User.findById({ _id: tokenId.id });

    if (!data) {
      return res.status(404).json({ message: "Không tìm thấy user nào." });
    }

    const payload = {
      id: data._id,
      role: data.role,
    };

    const newAccessToken = generateAccessToken(payload);

    return res
      .status(200)
      .json({ message: "Refresh token thành công.", newAccessToken });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateCart = async (req, res, next) => {
  try {
    const id = req.user.id;

    const { idSp, quantity, color, size } = req.body;

    if (!idSp) {
      return res.status(400).json({ message: "Đầu vào bị thiếu." });
    }

    const user = await User.findById({ _id: id }).select("cart");

    const checkCart = user.cart.find(
      (item) => item.product.toString() === idSp
    );

    if (checkCart) {
      await User.updateOne(
        { _id: id, "cart.product": idSp },
        {
          $set: {
            "cart.$.quantity": quantity,
            "cart.$.color": color,
            "cart.$.size": size,
          },
        }
      );
      const updatedUser = await User.findById({ _id: id }).select("cart");

      const totalCart = updatedUser.cart.length;
      return res
        .status(200)
        .json({ message: "Update giỏ hàng thanh công.", totalCart });
    }

    await User.updateOne(
      { _id: id },
      { $push: { cart: { product: idSp, quantity, color, size } } },
      { new: true }
    );

    const updatedUser = await User.findById({ _id: id }).select("cart");

    const totalCart = updatedUser.cart.length;

    return res
      .status(201)
      .json({ message: "Thêm vào giỏ hàng thanh công.", totalCart });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteCart = async (req, res, next) => {
  try {
    const id = req.user.id;

    const idSp = req.params.id;

    const user = await User.findById({ _id: id }).select("cart");

    user.cart = user.cart.filter((item) => item.product.toString() !== idSp);

    await user.save();

    const data = await User.findById({ _id: id }).populate({
      path: "cart.product",
      select: "-size -color -createdAt -updatedAt",
    });

    return res
      .status(200)
      .json({ message: "Xóa sản phẩm khỏi giỏ hàng thành công.", data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteCarts = async (req, res, next) => {
  try {
    const id = req.user.id;

    const productIds = req.params.id.split(",");

    const user = await User.findById({ _id: id }).select("cart");

    user.cart = user.cart.filter(
      (item) => !productIds.includes(item.product.toString())
    );

    await user.save();

    const data = await User.findById({ _id: id }).populate({
      path: "cart.product",
      select: "-size -color -createdAt -updatedAt",
    });

    return res
      .status(200)
      .json({ message: "Xóa sản phẩm khỏi giỏ hàng thành công.", data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  getAcount,
  updateCart,
  deleteCart,
  deleteCarts,
  refreshToken,
};
