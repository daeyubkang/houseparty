const { Users } = require("../models");
const bcrypt = require("bcrypt");
const saltNumber = 10;
const SECRET = "secretKey";
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();

const bcryptPassword = (password) => {
  return bcrypt.hashSync(password, saltNumber);
};

exports.index = (req, res) => {
  res.render("profile1");
};

exports.checkPW = async (req, res) => {
  console.log("checkPW");
  try {
    console.log("try문");
    const { token, oldPW } = req.body;
    const { id } = jwt.verify(token, SECRET);
    console.log(id);
    const user = await Users.findOne({ where: { id } });
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    } else {
      const isPasswordMatch = bcrypt.compareSync(oldPW, user.pw);
      if (isPasswordMatch) {
        res.json({ result: true, message: "비밀번호가 일치합니다." });
      } else {
        res.json({ result: false, message: "비밀번호가 일치하지 않습니다." });
      }
    }
  } catch (error) {
    console.error("비밀번호 확인 오류:", error);
    res.status(500).json({ message: "서버 오류" });
  }
};

// 비밀번호 변경 로직
exports.editPW = async (req, res) => {
  try {
    const { token, oldPW, newPW } = req.body;
    const { id } = jwt.verify(token, SECRET);

    // 여기에서 userId를 사용하여 비밀번호 변경 로직을 구현합니다.
    const user = await Users.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }

    const isPasswordMatch = bcrypt.compareSync(oldPW, user.pw);

    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ message: "기존 비밀번호가 일치하지 않습니다." });
    }

    const secretPW = bcryptPassword(newPW);

    const updatedUser = await Users.update({ pw: secretPW }, { where: { id } });

    res.json({ message: "비밀번호 변경이 완료되었습니다." });
  } catch (error) {
    console.error("비밀번호 변경 오류:", error);
    res.status(500).json({ message: "서버 오류" });
  }
};
