const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });
const adminController = require("../controllers/AdminController");

const cpUpload = upload.fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "images", maxCount: 3 },
]);

router.get("/", adminController.index);
router.put("/:id", adminController.update);
router.patch("/:id", adminController.renew);
router.get("/:id/edit", adminController.edit);
router.delete("/:id", adminController.destroy);
router.get("/create", adminController.create);
router.post("/store", cpUpload, adminController.store);

module.exports = router;
