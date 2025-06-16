// const express = require("express");
// const app = express();
// const jwt = require("jsonwebtoken");
// const userModel = require("./models/user");
// const postModel = require("./models/post");
// const cookieParser = require("cookie-parser");
// const bcrypt = require("bcrypt");
// const upload = require('./config/multerconfig')
// const path = require('path')

// app.set("view engine", "ejs");
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')))



// app.use(cookieParser());



// app.get("/", (req, res) => {
//   res.render("index");
// });

// app.get("/test", (req, res) => {
//   res.render("test");
// });

// app.get("/profile/upload",  (req, res) => {
// res.render('test')
// });

// app.post("/upload",isLoggedIn ,upload.single("image"), async (req, res) => {
//   let user = await userModel.findOne({ email: req.user.email });
//   user.profilepic = req.file.filename;
//   await user.save()
//   res.redirect('/profile')

// });

// app.get("/login", (req, res) => {
//   res.render("login");
// });

// app.post("/register", async (req, res) => {
//   let { name, username, email, password, age } = req.body;
//   let user = await userModel.findOne({ email });
//   if (user) return res.status(500).send("User already Register");

//   // if not user
//   // hash password
//   bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(password, salt, async (err, hash) => {
//       const users = await userModel.create({
//         username,
//         name,
//         email,
//         age,
//         password: hash,
//       });

//       let token = jwt.sign({ email: email, userid: users._id }, "secret key");
//       res.cookie("token", token);
//       // apply flash here
//       res.send("user registered");
//       // res.redirect('/dashboard')
//     });
//   });
// });

// app.post("/login", async (req, res) => {
//   let { email, password } = req.body;
//   let user = await userModel.findOne({ email });
//   if (!user) return res.status(500).send("Something went wrong"); //if no user found

//   //user is here match the password

//   bcrypt.compare(password, user.password, (err, result) => {
//     if (result) {
//       let token = jwt.sign({ email: email, userid: user._id }, "secret key");
//       res.cookie("token", token);
//       res.status(200).redirect("/profile");
//     } else res.redirect("/login");
//   });
// });

// app.get("/logout", (req, res) => {
//   res.cookie("token", "");
//   res.redirect("/login");
// });

// app.get("/profile", isLoggedIn, async (req, res) => {
//   let user = await userModel
//     .findOne({ email: req.user.email })
//     .populate("posts");
//   // res.send('you must be logged in first')
//   // console.log(req.user)

//   res.render("profile", { user });
// });

// app.get("/like/:id", isLoggedIn, async (req, res) => {
//   let post = await postModel.findOne({ _id: req.params.id }).populate("user");

//   if (!post) return res.status(404).send("Post not found");

//   const index = post.likes.indexOf(req.user.userid);
//   if (index === -1) {
//     post.likes.push(req.user.userid);
//   } else {
//     post.likes.splice(index, 1);
//   }

//   await post.save();
//   res.redirect("/profile");
// });

// app.get("/edit/:id", isLoggedIn, async (req, res) => {
//   let post = await postModel.findOne({ _id: req.params.id }).populate("user");

//   if (!post) return res.status(404).send("Post not found");

//   res.render("edit", { post });
// });

// app.post("/update/:id", isLoggedIn, async (req, res) => {
//   let post = await postModel.findOneAndUpdate(
//     { _id: req.params.id },
//     { content: req.body.content }
//   );

//   if (!post) return res.status(404).send("Post not found");

//   res.redirect("/profile");
// });

// app.post("/post", isLoggedIn, async (req, res) => {
//   // check who is logged in
//   let user = await userModel.findOne({ email: req.user.email });
//   let { content } = req.body;
//   let post = await postModel.create({
//     user: user._id,
//     content: content,
//   });
//   // now tell user that he has created post push the post id
//   user.posts.push(post._id);
//   await user.save();
//   res.redirect("/profile");
// });

// // middleware for protected routes
// // when we are login so we check the request basises

// // function isLoggedIn(req, res, next) {
// //   if (req.cookies.token === "") res.redirect('/login')
// //   else
// //   {
// //     let data = jwt.verify(req.cookies.token, "secret key");
// //     req.user = data
// //     }
// //   next()
// // }
// function isLoggedIn(req, res, next) {
//   const token = req.cookies?.token; // ✅ using optional chaining for safety

//   if (!token) {
//     return res.status(401).redirect("/login");
//   }

//   try {
//     const data = jwt.verify(token, "secret key");
//     req.user = data;
//     next();
//   } catch (err) {
//     return res.status(401).send("Invalid token");
//   }
// }

// app.listen(3000, () => {
//   console.log("server started at 3000 port");
// });

// Load environment variables first
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

// Set EJS as the view engine
app.set("view engine", "ejs");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "fallbackSecret",
    resave: false,
    saveUninitialized: false,
  })
);

// Serve static files
app.use("/images", express.static(path.join(__dirname, "public/images")));

// MongoDB Atlas connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB Atlas connected successfully");
  })
  .catch((err) => {
    console.error("❌ MongoDB Atlas connection error:", err);
  });

// Routes
app.get("/", (req, res) => {
  res.send("✅ Welcome to the Post App Backend. Server is running securely.");
});

app.use("/", require("./routes/auth"));
app.use("/", require("./routes/user"));
app.use("/", require("./routes/post"));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
