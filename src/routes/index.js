const adminRoute = require("./admin");
const siteRoute = require("./site");
const authRoute = require("./auth");
const isAuth = require("../middlewares/Auth");

function route(app) {
  app.use("/auth", authRoute);
  app.use("/admin", isAuth, adminRoute);
  app.use("/", siteRoute);

  // 404 route
  app.use((req, res, next) => {
    res.status(404).render("404", {
      layout: "main",
      title: "Không Tìm Thấy Trang",
    });
  });

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
  });
}

module.exports = route;
