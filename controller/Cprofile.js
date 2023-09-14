// const express = require("express");
// const router = express.Router();
// const { Users } = require("../models");
// const jwt = require("jsonwebtoken");
// const SECRET = "secretKey";

// exports.index = (req, res) => {
//   res.render("profile");
// };

// // 프로필 정보 업데이트 라우트
// exports.changeProfile = async (req, res) => {
//   try {
//     // 사용자 정보 업데이트
//     const { pw, name, gender, phone_number, birth, email, location } = req.body;

//     const token = req.body.token;

//     // 토큰 검증 및 사용자 ID 추출
//     const decodedToken = jwt.verify(token, SECRET);

//     // 추출한 사용자 ID
//     const userId = decodedToken.id;

//     // 사용자 정보 업데이트
//     const user = await Users.findByPk(userId);

//     if (!user) {
//       return res.status(404).send("사용자를 찾을 수 없습니다.");
//     }

//     // 업데이트할 필드들을 갱신
//     user.pw = pw;
//     user.name = name;
//     user.gender = gender;
//     user.phone_number = phone_number;
//     user.birth = birth;
//     user.email = email;
//     user.location = location;

//     // 변경 내용 저장
//     await user.save();

//     // 변경된 사용자 정보를 클라이언트에 전달
//     res.json(user);
//   } catch (error) {
//     console.error("프로필 업데이트 오류:", error);
//     res.status(500).send("서버 오류");
//   }
// };

// module.exports = router;
const { Users } = require("../models");
// const bcrypt = require("bcrypt");
const saltNumber = 10;
const SECRET = "secretKey";
const jwt = require("jsonwebtoken");

// exports.index = async (req, res) => {
//   // console.log("토큰", req.query);
//   try {
//     // 데이터베이스에서 프로필 정보를 가져옵니다.
//     // 클라이언트에서 JWT 토큰을 헤더의 Authorization 필드로 전송하므로, 서버에서는 헤더에서 토큰을 추출합니다.
//     const token = req.query.token;

//     console.log("server-token", token);

//     // JWT 토큰을 검증하고 토큰에 포함된 정보를 추출합니다.
//     const decodedToken = jwt.verify(token, SECRET);

//     // 토큰에서 추출한 정보를 사용하여 프로필 정보를 조회하거나 원하는 작업을 수행합니다.
//     const userId = decodedToken.id; // 토큰에 포함된 사용자 ID
//     // 이제 userId를 사용하여 데이터베이스에서 해당 사용자의 프로필 정보를 조회하거나 다른 작업을 수행할 수 있습니다.

//     const { name, gender, phone_number, birth, email } = req.query;

//     const user = await Users.findOne({
//       where: { id: userId },
//       name,
//       gender,
//       phone_number,
//       birth,
//       email,
//     });

//     // 프로필 페이지를 렌더링하면서 데이터를 전달합니다.
//     res.render("profile2", { user });
//   } catch (error) {
//     console.error("프로필 정보 불러오기 오류:", error);
//     res.status(500).json({ message: "서버 오류" });
//   }
// };

exports.index = (req, res) => {
  console.log("hi");
  res.render("profile");
  // try {
  //   const token = req.query;

  //   console.log("server-token", token);

  //   // JWT 토큰을 검증하고 토큰에 포함된 정보를 추출합니다.
  //   // const decodedToken = jwt.verify(token, SECRET);
  //   // console.log("decodedToken", decodedToken);

  //   res.render("profile2");
  // } catch {
  //   console.log("err");
  // }
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
    ],
  });

  console.log("user", user);

  res.json({ user: user });
};
