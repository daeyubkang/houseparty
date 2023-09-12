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

exports.index = async (req, res) => {
  try {
    const token = req.query.token;

    console.log("server-token", token);

    // JWT 토큰을 검증하고 토큰에 포함된 정보를 추출합니다.
    // const decodedToken = jwt.verify(token, SECRET);
    // console.log("decodedToken", decodedToken);

    res.render("profile2");
  } catch {
    console.log("err");
  }
};
