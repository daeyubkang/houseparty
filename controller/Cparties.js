const { Users, Parties } = require("../models");

exports.index = async (req, res) => {
  try {
    const Partiess = await Parties.findAll({
      attributes: [
        "title",
        "id",
        "party_num",
        "start_time",
        "tag",
        "createdAt",
      ],
    });

    console.log("게시글 불러오기 성공", Partiess);
    res.render("parties", { parties: Partiess });
  } catch (error) {
    console.log(error);
  }
};

exports.write = (req, res) => {
  res.render("write");
};

exports.writePost = async (req, res) => {
  try {
    console.log(req.body);
    const {
      id,
      title,
      description,
      head_count,
      date,
      image,
      tag,
      start_time,
      party_location,
    } = req.body;
    const Partiess = await Parties.create({
      id,
      title,
      description,
      date,
      head_count,
      image,
      tag,
      start_time,
      party_location,
    });
    console.log(Partiess);
    res.send(Partiess);
  } catch (error) {
    console.log(error);
  }
};
///////////////////////
// exports.search = async (req, res) => {
//   try {
//     const searchTerm = req.query.query; //검색어 받아옴.
// const searchResults = await Parties.findAll({
//   where: {
//     [Op.or]: [
//       { title: { [Op.like]: `%${searchTerm}` } },
//       { tag: { [Op.like]: `%${searchTerm}` } },
//     ],
//   },
//   attributes: [
//     "title",
//     "id",
//     "party_num",
//     "start_time",
//     "tag",
//     "createdAt",
//   ],
// });
//     console.log(searchResults);
//     res.render("search", { searchResults });
//   } catch (error) {
//     console.log("error", error);
//     res.status(500).json({ error: "서버 에러" });
//   }
// };
////////////////////////

// exports.search = async (req, res) => {
//   try {
//     const searchTerm = req.query.q; //검색어 가져오기
//     console.log("아아아아", searchTerm);
//     const result = await performSearchInDatabase(searchTerm);
//     res.json(result);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "검색 오류" });
//   }
// };

/////////////////////////////////////////
exports.search = (req, res) => {
  console.log("받아오기 성공");
  res.send({ message: "검색 결과를 보냈습니다." });
};
exports.hostParty = (req, res) => {
  res.render("host");
};
