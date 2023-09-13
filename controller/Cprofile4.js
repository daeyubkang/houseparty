const { Users } = require("../models");
const bcrypt = require("bcrypt");
const saltNumber = 10;
const SECRET = "secretKey";
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();

exports.index = (req, res) => {
  console.log("여기는 된다.");
  res.render("profile4");
};
exports.info = async (req, res) => {
  // 데이터베이스에서 프로필 정보를 가져옵니다.
  const token = req.query.token;
  console.log("server-token", token);

  // JWT 토큰을 검증
  const decodedToken = jwt.verify(token, SECRET);

  // 토큰에서 추출한 정보를 사용하여 프로필 정보를 조회
  const userId = decodedToken.id; // 토큰에 포함된 사용자 ID

  const { name, gender, phone_number, birth, email } = req.query;

  const user = await Users.findOne({
    where: { id: userId },
    attributes: [
      "name",
      "gender",
      "phone_number",
      "birth",
      "email",
      "location",
      "imgURL",
      "hobby",
    ],
  });

  console.log("user", user);

  res.json({ user: user });
};

exports.editHobby = async (req, res) => {
  const token = req.body.token;
  const hobby = req.body.hobby;
  console.log("hobby", req.body.hobby);

  // JWT 토큰을 검증
  const decodedToken = jwt.verify(token, SECRET);
  const userId = decodedToken.id;

  const updateHobby = await Users.update({ hobby }, { where: { id: userId } });
  res.json(updateHobby);
};
