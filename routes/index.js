const express = require('express');
const router = express.Router();
const mailer = require("../middleware/mailer");
const isBizMail = require("is-biz-mail");
const User = require("../models/User");
const {ensureAuthenticated} = require('../config/auth');

router.get("/", (req, res) => res.render("register"));

router.post("/", (req, res) => {
    const { email } = req.body;
    let errors = [];
    if (email) {
      isBizEmail = isBizMail.isFreeMailAddress(email);
      User.findOne({ email: email }).then(user => {
        if (user) {
          errors.push({ msg: "Email is already registered" });
          res.render("register", {
            errors,
            email
          });
        } else {
          if (isBizEmail) {
            errors.push({ msg: "Please enter a bussiness email" });
          }
  
          if (errors.length > 0) {
            res.render("register", {
              errors,
              email
            });
          } else {
            const newUser = new User({
              email,
              password: Math.floor(Math.random() * 899999 + 100000).toString()
            });
            newUser
              .save()
              .then(user => {
                let domain = email.substring(email.indexOf("@") + 1,email.indexOf('.'));
                mailer(req, res, email);
                req.flash("success_msg", `Only ${domain} has access to this`);
  
                res.redirect(`/users/login?email=${email}`);
              })
              .catch(err => console.log(err));
          }
        }
      });
    } else {
      errors.push({ msg: "Email can't be blank" });
      res.render("register", {
        errors,
        email
      });
    }
  });
router.get('/dashboard', ensureAuthenticated, (req,res)=> {
    let email = req.user.email;
    res.render('dashboard',{
        domain: email.substring(email.indexOf("@") + 1,email.indexOf('.com'))
})
});
module.exports = router;