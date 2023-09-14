const { Users } = require("../models");
const bcrypt = require("bcrypt");
const SECRET = "secretKey";
const jwt = require("jsonwebtoken");
const express = require("express");
const { Op } = require("sequelize");
const app = express();
const saltNumber = 10;

const nodemailer = require("nodemailer");
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
//비밀번호 암호화
const bcryptPassword = (password) => {
  return bcrypt.hashSync(password, saltNumber);
};
exports.updatePw = async (req, res) => {
  console.log("실행", req);
  console.log("하하하하", req.body);
  let secretPw = bcryptPassword(req.body.pw);
  try {
    const result = await Users.update(
      { pw: secretPw },
      {
        where: {
          [Op.and]: {
            name: { [Op.like]: req.body.name },
            id: { [Op.like]: req.body.id },
            birth: { [Op.like]: req.body.birth },
            phone_number: { [Op.like]: req.body.phone_number },
          },
        },
      }
    );
    res.json({ message: "비밀번호 재설정이 완료되었습니다." });
  } catch (error) {
    // 데이터베이스 쿼리 중에 발생하는 모든 오류를 처리합니다.
    console.error(error);
    res.status(500).json({ message: "내부 서버 오류" });
  }
};

exports.EmailAuthentication = async (req, res) => {
  const { email, id } = req.body;
  console.log("email", email);
  ///////////////아이디를 이용해서 이메일 가져와서 받아온 이메일이랑 비교
  const getEmail = await Users.findOne({
    attributes: ["email"],
    where: {
      id: id,
    },
  });
  console.log("getEmail", getEmail);
  console.log("getEmail.email", getEmail.email);
  if (email == getEmail.email) {
    const payload = Math.floor(100000 + Math.random() * 900000) + "";
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      },
    });
    let mailOptions = {
      from: process.env.NODEMAILER_USER,
      to: email,
      subject: "하우스 파티 인증 메일",
      text: `하우스 파티 인증 번호는 ${payload} 입니다. 3분내로 입력해주세요.`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        res.json({
          payload: payload,
          message: "인증번호를 이메일로 발송하였습니다.",
        });
        console.log("Email sent:" + info.response);
      }
    });
  } else {
    res.json({ message: "회원가입 당시 사용한 이메일을 입력해주세요." });
  }
};
