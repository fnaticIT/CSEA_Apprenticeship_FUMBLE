const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
    comments: {
      type: Array,
      default: [],
    },
    createdby: {
      type: String,
    },
    createdtype: {
      type: String,
    },
    isEvent: {
      type: Boolean,
      default: false,
    },
    eventName: {
      type: String,
    },
    eventDesc: {
      type: String,
    },
    eventDate: {
      type: String,
    },
    eventTime: {
      type: String,
    },
    naivename: {
      type: String,
    },
    expertname: {
      type: String,
    },
    sender: {
      type: String,
    },
    naivedisplay: {
      type: String,
    },
    expertdisplay: {
      type: String,
    },
    naiveid: {
      type: String,
    },
    expertid: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
