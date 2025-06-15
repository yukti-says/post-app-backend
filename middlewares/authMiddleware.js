function isLoggedIn(req, res, next) {
  if (req.session && req.session.passport && req.session.passport.user) {
    return next();
  }
  res.redirect("/login");
}

module.exports = { isLoggedIn };
