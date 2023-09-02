const { User } = require("../models");
const bcrypt = require("bcrypt");
const saltNumber = 10;
const SECRET = "secretKey";
const jwt = require("jsonwebtoken");

const comparePassword = (password, dbPassword) => {
  return bcrypt.compareSync(password, dbPassword);
};

exports.index = (req, res) => {
  res.render("signin");
};

exports.signinPost = (req, res) => {
  User.findOne({
    where: { userid: req.body.userid },
  }).then((result) => {
    console.log("123", result);
    if (result != null) {
      const compare = comparePassword(req.body.pw, result.dataValues.pw);
      res.send({ result: compare });
    } else {
      res.send({ result: false });
    }
  });
};
