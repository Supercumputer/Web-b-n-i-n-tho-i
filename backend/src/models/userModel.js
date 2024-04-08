const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, default: "" },
    avata: { type: String, default: "" },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, unique: true, default: "" },
    date: { type: String, required: true },
    sex: { type: String, required: true },
    role: { type: String, default: "User" },
    address: { type: String, default: "" },
    refreshToken: { type: String, default: "" },
    cart: [
      {
        product: { type: mongoose.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
        color: { type: String },
        size: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", user);
