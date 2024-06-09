const mongoose = require("mongoose");
const moment = require("moment");

const blogScheme = new mongoose.Schema(
  {
    image: {
      type: {},
      default: null,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    author_name: {
      type: String,
      default: null,
    },
    author_email: {
      type: String,
      default: null,
    },
    created_ts: {
      type: Date,
      default: Date.now,
    },
    // postDate: {
    //   type: String,
    //   default: moment().format("DD/MM/YYYY"),
    // },
    // postTime: {
    //   type: String,
    //   default: moment().format("HH:mm"),
    // },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Blog", blogScheme);
