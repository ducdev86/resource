const Post = require("../models/Post");
const moment = require("moment");
const {
  multipleMongooseToObject,
  mongooseToObject,
} = require("../util/mongoose");

class SiteController {
  // [GET] /
  index(req, res, next) {
    Post.find({})
      .sort({ createdAt: -1 })
      .then((posts) =>
        res.render("home", {
          layout: "main",
          posts: multipleMongooseToObject(posts),
          title: "Mua Bán Nhà Đất | Dịch Vụ Nhà Đất - Nhadatduchoa.vn",
        })
      )
      .catch(next);
  }

  // [GET] /article/:slug
  detail(req, res, next) {
    const slug = req.params.slug;
    moment.locale("vi");
    Post.findOne({ slug })
      .then((article) => {
        if (!article) {
          return res.status(404).render("404", {
            layout: "main",
            title: "Không Tìm Thấy Trang",
          });
        }
        res.render("article", {
          layout: "main",
          article: mongooseToObject(article),
          date: moment(article.createdAt).fromNow(),
          title: `${article.title} - Nhadatduchoa.vn`,
        });
      })
      .catch(next);
  }

  // [GET] /nha-dat/:slugAddress
  land(req, res, next) {
    const slugAddress = req.params.slugAddress;
    Post.find({ slugAddress })
      .then((posts) => {
        res.render("query", {
          posts: multipleMongooseToObject(posts),
          layout: "main",
          title: `Mua Bán Nhà Đất ${
            posts.length > 0 ? posts[0].add1 : ""
          } - Nhadatduchoa.vn`,
          add1: posts.length > 0 ? posts[0].add1 : null,
        });
      })
      .catch(next);
  }
  // [GET] /contact
  contact(req, res, next) {
    res.render("contact", {
      layout: "main",
      title: "Trang Liên Hệ - Nhà Đất Đức Hòa",
    });
  }

  // [GET] /news
  news(req, res, next) {
    res.render("news", {
      layout: "main",
      title: "Đang Cập Nhật",
    });
  }
}

module.exports = new SiteController();
