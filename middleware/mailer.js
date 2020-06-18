const postmark = require("postmark");
const User = require("../models/User");
// Send an email:
let client = new postmark.ServerClient("4ab865fb-7652-4014-bda2-da4485d74054");
const mailer = (req, res,email) => {
  User.findOne({ email: email }).then(user => {
    client.sendEmail({
      From: "kash@upcommune.com",
      To: email,
      Subject: "Test",
      TextBody: `Please enter ${user.password} to login to commune. The code expires in 15 mins.`
    });
  });
};

module.exports = mailer;
