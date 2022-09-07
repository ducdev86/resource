const Post = require("../models/Post");
const coverAddress = require("../util/coverAddress");
const generatoreID = require("../util/generatorID");
const processImage = require("../util/processImage");
const {
  mongooseToObject,
  multipleMongooseToObject,
} = require("../util/mongoose");

class AdminController {
  // [GET] /admin
  index(req, res, next) {
    Post.find({})
      .then((posts) =>
        res.render("admin/index", {
          layout: "bootstrap",
          title: "Admin",
          posts: multipleMongooseToObject(posts),
        })
      )
      .catch(next);
  }
  // [GET] /admin/create
  create(req, res) {
    res.render("admin/create", { layout: "bootstrap", title: "Thêm Tin Mới" });
  }

  // [POST] /admin/store
  async store(req, res, next) {
    const {
      title,
      content,
      size,
      area,
      contact,
      phone,
      price,
      type,
      add1,
      add2,
    } = req.body;

    if (
      !title ||
      !content ||
      !size ||
      !area ||
      !contact ||
      !phone ||
      !price ||
      !type ||
      !add1 ||
      !add2 ||
      typeof req.files["images"] == "undefined" ||
      typeof req.files["thumbnail"] == "undefined"
    ) {
      return res.render("admin/create", {
        layout: "bootstrap",
        title: "Thêm Tin Mới",
        error: "Vui lòng điền đẩy đủ thông tin, hình ảnh",
      });
    }

    // processImage
    const ID = generatoreID();

    let formatName = req.files["thumbnail"][0].originalname
      .split(" ")
      .join("-");
    const thumbnail = `uploads/120x100-${ID}-${formatName}`;

    let images = [];

    for (let image of req.files["images"]) {
      let formatName = image.originalname.split(" ").join("-");
      images.push(`uploads/960x720-${ID}-${formatName}`);
    }

    processImage(req.files["thumbnail"][0], req.files["images"], ID);

    const post = new Post({
      title,
      content,
      size,
      area,
      contact,
      phone,
      price,
      type,
      add1: coverAddress(add1),
      add2,
      images,
      thumbnail,
    });

    post
      .save()
      .then(() => res.redirect("/admin"))
      .catch(next);
  }

  // [GET] /admin/:id/edit
  edit(req, res, next) {
    Post.findById({ _id: req.params.id })
      .then((post) =>
        res.render("admin/edit", {
          layout: "bootstrap",
          title: "Chỉnh Sửa",
          post: mongooseToObject(post),
        })
      )
      .catch(next);
  }

  // [PUT] /admin/:id
  update(req, res, next) {
    req.body.add1 = coverAddress(req.body.add1);
    Post.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/admin"))
      .catch(next);
  }

  // [PATCH] /admin/:id
  renew(req, res, next) {
    Post.updateOne({ _id: req.params.id }, { createdAt: Date.now() })
      .then(() => res.redirect("/admin"))
      .catch(next);
  }

  // [DELETE] /admin/:id
  destroy(req, res, next) {
    Post.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
}

module.exports = new AdminController();
