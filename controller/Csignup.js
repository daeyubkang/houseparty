const { Users } = require("../models");

const bcrypt = require("bcrypt");
const { response } = require("express");
const saltNumber = 10;
const SECRET = "secretKey";
const jwt = require("jsonwebtoken");

const nodemailer = require("nodemailer");

//비밀번호 암호화
const bcryptPassword = (password) => {
  return bcrypt.hashSync(password, saltNumber);
};

exports.index = (req, res) => {
  res.render("signup1");
};

exports.signupPost = async (req, res) => {
  try {
    console.log(req.body);
    const {
      id,
      pw,
      name,
      gender,
      phone_number,
      location,
      birth,
      email,
      imgURL,
    } = req.body;
    let secretPw = bcryptPassword(pw);
    const user = await Users.create({
      id,
      pw: secretPw,
      name,
      gender,
      phone_number,
      location,
      birth,
      email,
      imgURL,
    });

    const token_signup = jwt.sign({ id }, SECRET);

    console.log(user);
    res.send({ user, token_signup });
  } catch (error) {
    console.log(error);
  }
};

exports.signupHobby = async (req, res) => {
  try {
    const { hobby, token } = req.body;

    // 토큰을 사용하여 사용자 ID를 추출합니다.
    const { id } = jwt.verify(token, SECRET);

    // 사용자를 업데이트합니다.
    const updatedUser = await Users.update(
      { hobby }, // 업데이트할 필드 및 값
      { where: { id } } // 업데이트할 사용자를 식별하기 위한 조건
    );

    // 업데이트된 사용자 정보를 반환합니다.
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "서버 오류" });
  }
};

// const smtpTransport = nodemailer.createTransport({
//   service: "gmail", //사용할 메일 서비스
//   auth: {
//     user: process.env.NODEMAILER_USER, //메일 계정
//     pass: process.env.NODEMAILER_PASS, //기기용 비번
//   },
//   tls: {
//     rejectUnauthorized: false,
//   },
// });

// exports.EmailAuthentication = async (req, res) => {
//   console.log("이메일", req.body);
//   const { email } = req.body;
//   const payload = Math.floor(100000 + Math.random() * 900000) + "";
//   if (email) {
//     const mailOptions = {
//       from: process.env.NODEMAILER_USER,
//       to: email,
//       subject: "test 인증 메일",
//       html: `<strong>인증번호는 ${payload}입니다. </strong>`,
//     };
//     await smtpTransport.sendMail(mailOptions, (error, responses) => {
//       if (error) {
//         res.status(400).json({ ok: false });
//       } else {
//         res.status(200).json({ ok: true });
//       }
//       smtpTransport.close();
//     });
//   }
//   return res.status(200).json({ ok: true });
// };
exports.EmailAuthentication = async (req, res) => {
  const { email } = req.body;
  console.log("email", email);
  console.log("user", process.env.NODEMAILER_USER);
  if (email) {
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
        res.json({ payload: payload });
        console.log("Email sent:" + info.response);
      }
    });
  }
};
