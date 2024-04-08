const { verifyToken } = require("../service/authService");

const extrackToken = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }
};

const checkToken = (req, res, next) => {
  const token = extrackToken(req);

  if (!token) {
    return res.status(400).json({ messager: "You are not login." });
  }

  const decode = verifyToken(token);

  if (!decode) {
    return res.status(400).json({ messager: "You are not login." });
  }

  req.user = decode;

  next();
};

const checkPermistion = (req, res, next) => {
  if (req.user.role === "Admin") {
    next();
  } else {
    return res.status(400).json({ messager: "You don't have permistion." });
  }
};

module.exports = { checkPermistion, checkToken };
