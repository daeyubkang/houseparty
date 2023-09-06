const SECRET = "secretKey";
const jwt = require("jsonwebtoken");

exports.verify = (req, res) => {
  jwt.verify(req.body.token, SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .send({ result: false, message: "검증에 실패하였습니다." });
    }
    res.send({ result: true, user: decoded });
  });
};
