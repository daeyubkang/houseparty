const { Users } = require("../models");
const bcrypt = require("bcrypt");
const SECRET = "secretKey";
const jwt = require("jsonwebtoken");
const express = require("express");
const { Op } = require("sequelize");
const app = express();

exports.index = (req, res) => {
  res.render("find");
};

exports.findId = async (req, res) => {
  console.log("실행", req);
  console.log("하하하하", req.body);
  try {
    const result = await Users.findOne({
      attributes: ["id"],
      where: {
        [Op.and]: {
          name: { [Op.like]: req.body.name },
          birth: { [Op.like]: req.body.birth },
          phone_number: { [Op.like]: req.body.phone_number },
        },
      },
    });

    if (result != null) {
      console.log("성공", result);
      // 사용자가 찾아진 경우 JSON 응답으로 보냅니다.
      res.json({ findId: result.id }); // user.id 값을 응답에 추가합니다.
    } else {
      console.log("에러");
      // 사용자를 찾을 수 없는 경우 적절한 응답을 보냅니다.
      res.status(404).json({ message: "사용자를 찾을 수 없습니다" });
    }
  } catch (error) {
    // 데이터베이스 쿼리 중에 발생하는 모든 오류를 처리합니다.
    console.error(error);
    res.status(500).json({ message: "내부 서버 오류" });
  }
};
exports.findPw = async (req, res) => {
  console.log("실행", req);
  console.log("하하하하", req.body);
  try {
    const result = await Users.findOne({
      attributes: ["pw"],
      where: {
        [Op.and]: {
          name: { [Op.like]: req.body.name },
          id: { [Op.like]: req.body.id },
          birth: { [Op.like]: req.body.birth },
          phone_number: { [Op.like]: req.body.phone_number },
        },
      },
    });

    if (result != null) {
      console.log("성공", result.pw);
      const findpw = jwt.verify(result.pw, SECRET);
      console.log("findPWd", findpw);
      // 사용자가 찾아진 경우 JSON 응답으로 보냅니다.
      res.json({ findPw: result.pw }); // user.id 값을 응답에 추가합니다.
    } else {
      console.log("에러");
      // 사용자를 찾을 수 없는 경우 적절한 응답을 보냅니다.
      res.status(404).json({ message: "사용자를 찾을 수 없습니다" });
    }
  } catch (error) {
    // 데이터베이스 쿼리 중에 발생하는 모든 오류를 처리합니다.
    console.error(error);
    res.status(500).json({ message: "내부 서버 오류" });
  }
};
