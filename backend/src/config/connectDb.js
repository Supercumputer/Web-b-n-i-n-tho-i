const mongoose = require("mongoose");
require("dotenv").config();

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connect database success !!!");
  } catch (error) {
    console.log("Connect database faild !!!");
  }
};

module.exports = connectDb;
