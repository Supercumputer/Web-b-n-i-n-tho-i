const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const category = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Category", category);
