const { Users } = require("../models");
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
    const { id, pw, name, gender, phone_number, location, hobby, birth } =
      req.body;
    let secretPw = bcryptPassword(pw);
    const user = await Users.create({
      id,
      pw: secretPw,
      name,
      gender,
      phone_number,
      location,
      hobby,
      birth,
    });
    console.log(user);
    res.send(user);
  } catch (error) {
    console.log(error);
  }
};
