const { Users } = require("../models");
const bcrypt = require("bcrypt");
const SECRET = "secretKey";
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();

exports.index = (req, res) => {
  res.render("find");
};
