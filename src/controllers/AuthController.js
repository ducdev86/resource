const User = require("../models/User");
const bcrypt = require("bcryptjs");

class AuthController {
  // [GET] /auth/login
  getLogin(req, res) {
    res.render("auth/login", { layout: "bootstrap", title: "Đăng Nhập" });
  }

  // [POST] /auth/login
  async postLogin(req, res) {
    const { email, password } = req.body;

    if (!email) {
      return res.render("auth/login", {
        layout: "bootstrap",
        title: "Đăng Nhập",
        error: "Vui lòng nhập <b>Email!</b>",
        email,
        password,
      });
    }

    if (!password) {
      return res.render("auth/login", {
        layout: "bootstrap",
        title: "Đăng Nhập",
        error: "Vui lòng nhập <b>Mật Khẩu!</b>",
        email,
        password,
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.render("auth/login", {
        layout: "bootstrap",
        title: "Đăng Nhập",
        error: "Người dùng không tồn tại!",
        email,
        password,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.render("auth/login", {
        layout: "bootstrap",
        title: "Đăng Nhập",
        error: "<b>Mật khẩu</b> không chính xác!",
        email,
        password,
      });
    }

    req.session.isAuth = true;
    return res.redirect("/admin");
  }

  // [GET] /auth/register
  // getRegister(req, res) {
  //   res.render("auth/register", { layout: "bootstrap", title: "Register" });
  // }

  // [POST] /auth/register
  // async postRegister(req, res, next) {
  //   const { email, password } = req.body;
  //   const hasdedPassword = await bcrypt.hash(password, 10);
  //   const user = new User({
  //     email,
  //     password: hasdedPassword,
  //   });
  //   user
  //     .save()
  //     .then(() => res.redirect("/auth/login"))
  //     .catch(next);
  // }
  // [DELETE] /auth/logout
  logout(req, res) {
    req.session.destroy((err) => {
      if (err) throw err;
      res.redirect("/auth/login");
    });
  }
}

module.exports = new AuthController();
