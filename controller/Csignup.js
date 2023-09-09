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
    const { id, pw, name, gender, phone_number, location, birth, imageUrl } =
      req.body;
    let secretPw = bcryptPassword(pw);
    const user = await Users.create({
      id,
      pw: secretPw,
      name,
      gender,
      phone_number,
      location,
      birth,
      imageUrl,
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
