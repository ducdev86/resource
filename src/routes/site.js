const express = require("express");
const router = express.Router();
const siteController = require("../controllers/SiteController");

router.get("/", siteController.index);

router.get("/article/:slug", siteController.detail);
router.get("/nha-dat/:slugAddress", siteController.land);
router.get("/contact", siteController.contact);
router.get("/news", siteController.news);

module.exports = router;
