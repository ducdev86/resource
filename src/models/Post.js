const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);
const slug = require("mongoose-slug-generator");

const Post = new Schema(
  {
    _id: {
      type: Number,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    add1: {
      type: String,
      required: true,
    },
    add2: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
    },

    images: {
      type: Array,
    },
    slug: {
      type: String,
      slug: "title",
      unique: true,
    },
    slugAddress: {
      type: String,
      slug: "add1",
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    _id: false,
    timestamps: false,
  }
);

mongoose.plugin(slug);

Post.plugin(AutoIncrement);

module.exports = mongoose.model("Post", Post);
