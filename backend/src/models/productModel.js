const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);

const product = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      slug: "title",
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: Array,
      default: [],
    },
    description: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    color: {
      type: Array,
      default: ["red", "blue", "green", "black"],
    },
    size: {
      type: Array,
      default: ["S", "M", "L", "XL", "XXL"],
    },
    sold: {
      type: Number,
      default: 0,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
    brand: {
      type: String,
      default: "",
    },
    ratings: [
      {
        start: { type: Number },
        postedBy: { type: mongoose.Types.ObjectId, ref: "User" },
        comment: { type: String },
        createdAt: { type: Date, default: Date.now }
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", product);
