const { Users } = require("../models/");

exports.index = (req, res) => {
  res.render("signin");
};

exports.signin = (req, res) => {
  console.log(req.body);
  Users.findAll().then((result) => {
    console.log("res", result);
    res.json({ data: result });
  });
};
