const { User } = require("../models");
const bcrypt = require("bcrypt");
const saltNumber = 10;
const SECRET = "secretKey";
const jwt = require("jsonwebtoken");

//비밀번호 암호화
const bcryptPassword = (password) => {
  return bcrypt.hashSync(password, saltNumber);
};

exports.index = (req, res) => {
  res.render("signup");
};

exports.signupPost = async (req, res) => {
  try {
    console.log(req.body);
    const { userid, pw, name, gender, phoneNum, region, favorite } = req.body;
    let secretPw = bcryptPassword(pw);
    const user = await User.create({
      userid,
      pw: secretPw,
      name,
      gender,
      phoneNum,
      region,
      favorite,
    });
    console.log(user);
    res.send(user);
  } catch (error) {
    console.log(error);
  }
};
