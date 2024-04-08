const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const banner = new Schema({
  title: { type: String, required: true, unique: true},
  image_path:{type: String, required: true} ,
  link_path: {type: String, default: '/'},
  position: {type: String, default: ''},
  start_date: { type: Date, default: Date.now },
  end_date: {type: Date},
});

module.exports = mongoose.model("Banner", banner);
