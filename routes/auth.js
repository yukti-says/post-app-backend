const express = require("express");
const router = express.Router();
const userModel = require("../models/user");
const bcrypt = require("bcrypt");

// GET register page
router.get("/", (req, res) => {
  res.render("index"); // no oldData or error
});

// POST register logic
router.post("/register", async (req, res) => {
  try {
    const { username, name, age, email, password } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.render("index", {
        error: "Email already registered!",
        oldData: req.body,
      });
    }

    const hash = await bcrypt.hash(password, 10);
    await userModel.create({
      username,
      name,
      age,
      email,
      password: hash,
    });

    res.redirect("/login");
  } catch (err) {
    console.log(err);
    res.render("index", {
      error: "Registration failed. Please try again.",
      oldData: req.body,
    });
  }
});

// GET login page
router.get("/login", (req, res) => {
  res.render("login");
});

// POST login logic
router.post("/login", async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });

    if (user && (await bcrypt.compare(req.body.password, user.password))) {
      req.session.userid = user._id;
      res.redirect("/profile");
    } else {
      res.render("login", { error: "Invalid email or password" });
    }
  } catch (err) {
    console.log(err);
    res.render("login", { error: "Login failed. Please try again." });
  }
});

// Logout
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

module.exports = router;
