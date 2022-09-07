module.exports = function (req, res, next) {
  if (req.session.isAuth) {
    res.locals.user = true;
    next();
  } else {
    return res.redirect("/auth/login");
  }
};
