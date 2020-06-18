const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");

const User = require("../models/User");

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      // Match user
      User.findOne({
        email: email
      }).then(user => {
        if (!user) {
          return done(null, false, { message: "You are not yet registered" });
        }

        if (password === user.password) {
          return done(null, user);
        } else if (Date.now() - user.date > 0) {
        } else {
          return done(null, false, { message: "Password Incorrect!" });
        }
      });
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
