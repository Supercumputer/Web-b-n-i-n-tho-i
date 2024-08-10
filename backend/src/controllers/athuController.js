// 200 OK: Yêu cầu thành công.
// 201 Created: Tài nguyên đã được tạo thành công.
// 204 No Content: Yêu cầu thành công nhưng không có dữ liệu để trả về.
// 400 Bad Request: Yêu cầu không hợp lệ từ phía client.
// 401 Unauthorized: Client không được ủy quyền thực hiện yêu cầu.
// 403 Forbidden: Client không có quyền truy cập vào tài nguyên.
// 404 Not Found: Tài nguyên không được tìm thấy.
// 500 Internal Server Error: Lỗi xảy ra từ phía server.
const Users = require("../models/userModel");

const {
  checkEmail,
  hashPassWord,
  comparePassWord,
  generateAccessToken,
  gennerateRefreshToken,
} = require("../service/authService");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: "Missing input" });
    }

    const data = await Users.findOne({ email: email });

    if (data) {
      const checkPass = comparePassWord(password, data.password);
      if (checkPass) {
        const {
          password,
          refreshToken: refToken,
          role,
          ...userData
        } = data.toObject();

        const payLoad = {
          id: userData._id,
          role,
        };

        const accessToken = generateAccessToken(payLoad);
        const refreshToken = gennerateRefreshToken(payLoad);

        res.cookie("JWT", refreshToken, {
          maxAge: process.env.JWT_EXPIRESIN,
          httpOnly: true,
        });

        await Users.findByIdAndUpdate(
          { _id: userData._id },
          { refreshToken },
          { new: true }
        );

        return res.status(200).json({
          success: true,
          message: "Login success !!!",
          userData,
          accessToken,
        });
      } else {
        return res.status(404).json({ message: "Email or password not true" });
      }
    } else {
      return res.status(404).json({ message: "Email or password not true" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Thiếu thông tin đầu vào." });
    }

    let check = await checkEmail(email);

    if (check) {
      return res.status(400).json({ message: "Email đã tồn tại." });
    }

    const newPassWord = hashPassWord(password);

    const newUser = Users.create({
      ...req.body,
      userName: req.body.firstName,
      password: newPassWord,
    });

    if (newUser) {
      return res
        .status(201)
        .json({ success: true, message: "Tạo người dùng thành công." });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "'Tạo người dùng thất bại.'" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const logout = async (req, res, next) => {
  try {
    const cookie = req.cookies;
    if (!cookie && !cookie.JWT) {
      return res.status(400).json({
        message: "No refresh token in cookie.",
      });
    }

    await Users.updateOne(
      { refreshToken: cookie.JWT },
      { refreshToken: "" },
      { new: true }
    );

    res.clearCookie("JWT", { httpOnly: true, secure: true });
    return res.status(200).json({
      message: "Logout success",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  login,
  register,
  logout,
};
