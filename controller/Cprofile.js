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
