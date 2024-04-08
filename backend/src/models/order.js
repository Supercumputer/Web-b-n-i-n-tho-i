const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const order = new Schema(
  {
    products: [
      {
        product: { type: mongoose.Types.ObjectId, ref: "Product" },
        color: String,
        size: String,
        quantity: { type: Number, default: 1 },
      },
    ],

    status: {
      type: String,
      enum: ["Chưa thanh toán", "Đã thanh toán"],
    },

    total: {
      type: Number,
      default: 0,
    },

    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", order);
