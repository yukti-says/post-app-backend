const express = require("express");
const router = express.Router();
const postModel = require("../models/post");
const userModel = require("../models/user");

function isLoggedIn(req, res, next) {
  if (req.session.userid) next();
  else res.redirect("/login");
}

router.post("/post", isLoggedIn, async (req, res) => {
  const user = await userModel.findById(req.session.userid);
  const post = await postModel.create({
    content: req.body.content,
    user: user._id,
  });
  user.posts.push(post._id);
  await user.save();
  res.redirect("/profile");
});

router.get("/like/:id", isLoggedIn, async (req, res) => {
  const post = await postModel.findById(req.params.id);
  const index = post.likes.indexOf(req.session.userid);
  if (index === -1) {
    post.likes.push(req.session.userid);
  } else {
    post.likes.splice(index, 1);
  }
  await post.save();
  res.redirect("/profile");
});

router.get("/delete/:id", isLoggedIn, async (req, res) => {
  await postModel.findByIdAndDelete(req.params.id);
  await userModel.findByIdAndUpdate(req.session.userid, {
    $pull: { posts: req.params.id },
  });
  res.redirect("/profile");
});

module.exports = router;
