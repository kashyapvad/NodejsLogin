const express = require("express");
const router = express.Router();
const passport = require("passport");

// const { window } = new JSDOM();
// const { document } = (new JSDOM('')).window;
// global.document = document;


// let jsdom = require("jsdom");
// const { JSDOM } = jsdom;



router.get("/login", (req, res) =>
  res.render("login", { email: req.query.email })
);
// //router.get("/register", (req, res) => res.render("register"));
// router.get("/", (req, res) => {
//   res.render("register");
//   curl.get(url, null, (err,resp,body)=>{
//         if(resp.statusCode == 200){
//           const { window } = new JSDOM(body);
//           let $ = jQuery = require('jquery')(window);
//           global.document = window.document;

//           let form = document.querySelector('#addForm');
//           console.log(form);
//           $.ajax({
//             url: "http://localhost:5000/",
//             method: "POST",
//             data: {
//                 email: "email",
//             },
//             dataType: "json"
//           }).done(function(data) {
//             console.log(data)
//           });
//         }
//       });

// });

// router.post("/",(req,res)=>{
//   res.status(204).send();
// })

// router.post("/", (req,res)=>{
//   curl.get(url, null, (err,resp,body)=>{
//     if(resp.statusCode == 200){
//       dom = new JSDOM(body);
//       const window = dom.window;
//       const $ = require('jquery')(window);
//         $.ajax({
//           url: 'http://localhost:5000/',
//           data: $("#addForm").serialize(),
//           method: 'POST'
//         }).then(function (data) {
//           console.log('here')
//           console.log(data);
//           $('body').append(data);
//           console.log(email);
//           }).catch(function (err) {
//           console.error(err);
//           });
//      }
//     else{
//        console.log("error while fetching url");
//     }
//   });
// });



router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/users/login");
});
module.exports = router;
