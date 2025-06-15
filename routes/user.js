const express = require("express");
const router = express.Router();
const userModel = require("../models/user");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images/uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

function isLoggedIn(req, res, next) {
  if (req.session.userid) next();
  else res.redirect("/login");
}

router.get("/profile", isLoggedIn, async (req, res) => {
  const user = await userModel.findById(req.session.userid).populate("posts");
  res.render("profile", { user });
});

router.post("/upload", isLoggedIn, upload.single("image"), async (req, res) => {
  await userModel.findByIdAndUpdate(req.session.userid, {
    profilepic: req.file.filename,
  });
  res.redirect("/profile");
});

module.exports = router;
