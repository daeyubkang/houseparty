const { Users } = require("../models");
const bcrypt = require("bcrypt");
const saltNumber = 10;
const SECRET = "secretKey";
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const session = require("express-session");

app.use(
  session({
    secret: "mySessionKey",
    resave: false, //덮어쓰기 가능 여부 결정
    saveUninitialized: true,
  })
);

const comparePassword = (password, dbPassword) => {
  return bcrypt.compareSync(password, dbPassword);
};

exports.index = (req, res) => {
  res.render("signin");
};

exports.signin = (req, res) => {
  console.log(req.body);
  // Users.findAll({ where: { id: req.body.id } }).then((result) => {
  //   console.log(result);
  // });
  Users.findOne({
    where: { id: req.body.id },
  }).then((result) => {
    console.log("123", result);
    if (result != null) {
      const compare = comparePassword(req.body.pw, result.dataValues.pw);
      req.session.name = req.body.id;
      req.session.password = req.body.pw;
      res.send({ result: compare });
    } else {
      res.send({ result: false });
    }
  });
};
