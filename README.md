# 📝 Post App — My First Backend Project with Node.js, Express, MongoDB

Hi! I'm Yukti 👋  
This is my **first complete backend project** where I learned the basics of server-side development and applied them to build a simple post application using:

- **Node.js + Express**
- **MongoDB + Mongoose**
- **EJS templating**
- **Session-based authentication**
- **Basic CRUD operations**

---

## 🔧 Features Implemented

- 🔐 **User Authentication** (Register, Login, Logout)
- 👤 **User Sessions** with `express-session`
- 📝 **Create, View, and Delete Posts**
- 💾 **MongoDB Integration** using `mongoose`
- 🖥️ **EJS Templating Engine** for frontend rendering
- 🧰 **Clean UI** using Tailwind CSS
- 🍪 **Cookie Management** with `cookie-parser`
- ✅ Input validations and redirect handling

---

## 🎯 Project Goal

To **understand the backend flow** from server creation to authentication and database interaction. I wanted to explore how a web app handles:

- Route-based architecture
- User login sessions
- Connecting frontend forms with backend logic
- Persistent storage with MongoDB

---

## 📂 Folder Structure

PostApp/
│
├── models/ # MongoDB Mongoose models
│ └── user.js
│ └── post.js
│
├── routes/ # Express routes
│ └── auth.js
│ └── user.js
│ └── post.js
│
├── views/ # EJS templates
│ └── index.ejs
│ └── login.ejs
│ └── profile.ejs
│ └── feed.ejs
│
├── public/ # Static files (images, css)
│
├── app.js # Main server entry
├── package.json
└── README.md

markdown
Copy code

---

## 💡 How I Approached It

### 1. Setup & Structure
- Initialized the project with `npm init`
- Installed required dependencies:  
  `express`, `ejs`, `mongoose`, `express-session`, `cookie-parser`, `bcrypt`, `nodemon`
- Set up basic folder structure and routing system

### 2. User Auth Flow
- Created `auth.js` route with register/login/logout
- Used `bcrypt` for secure password hashing
- Stored session info using `express-session` and cookies

### 3. Posts Feature
- Created `postModel` and defined CRUD operations
- Made simple views using EJS to create & show posts

### 4. Templating and Styling
- Connected EJS views to backend
- Styled everything using Tailwind CSS to make it look clean and minimal

### 5. Bug Fixes & Cleanup
- Fixed async bugs with proper `try-catch`
- Removed image upload after experimenting
- Ensured form fields clear after submission

---

## 🚀 How to Run It Locally

### 1. Clone the repo:
```bash
git clone https://github.com/YOUR_USERNAME/post-app
cd post-app
```

### 2. Install dependencies:
```
npm install
```

### 3. Start MongoDB server:
Make sure MongoDB is installed and running on your local machine.

### 4. Run the app:
```
nodemon app.js
```
The server will run at http://localhost:3000

## 🌟 What I Learned
Setting up backend apps from scratch

RESTful routing and middleware

Password hashing with bcrypt

Using MongoDB with Mongoose

Writing cleaner, modular backend code

## 📢 Let's Connect!
Feel free to connect or message me on LinkedIn
I'll be sharing more of my learning journey, especially in backend, web dev, and data analysis.


## 📌 Acknowledgements
Thanks to the online dev community, YouTube, and documentation that helped me build and debug this project! 💙

“Do whatever you want, but I feel like sometimes destiny wins; what's written, that happens.”
— Yukti Sah
