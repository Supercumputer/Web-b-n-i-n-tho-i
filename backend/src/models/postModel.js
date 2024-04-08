const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);

const post = new Schema(
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
      required: true,
    },
    view: {
      type: Number,
      default: 0,
    },
    totalheart: {
      type: Number,
      default: 0,
    },
    slug: {
      type: String,
      slug: "title",
    },
    heart: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    comment: [
      {
        userId: { type: mongoose.Types.ObjectId, ref: "User" },
        comment: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", post);
