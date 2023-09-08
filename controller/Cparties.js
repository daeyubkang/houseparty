const { Users, Parties, Amenities, Tags } = require("../models");

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

exports.hostParty = async (req, res) => {
  const allTags = await Tags.findAll({
    attributes: ["tag_name", "tag_category", "tag_category_num"],
  });
  const allAmens = await Amenities.findAll({
    attributes: ["amen_name", "amen_category"],
  });
  //console.log(allTags);
  res.render("host", { allTags, allAmens });
};

exports.hostPartyPost = async (req, res) => {
  try {
    console.log("reqbody:", req.body);
    const {
      id,
      title,
      description,
      date,
      start_time,
      end_time,
      head_count,
      image,
      tags,
      party_location,
      amenities,
    } = req.body;
    const party = await Parties.create({
      id,
      title,
      description,
      date,
      start_time,
      end_time,
      head_count,
      image,
      party_location,
    });
    //받은(선택된) 태그값을 파티 정보에 추가
    const selectedTagNames = tags;
    if (selectedTagNames.length > 0) {
      const selectedTags = await Tags.findAll({
        where: { tag_name: selectedTagNames },
      });
      await party.addTags(selectedTags);
    }
    //받은(선택된) 어메니티값을 파티 정보에 추가
    const selectedAmenityNames = amenities;
    if (selectedAmenityNames.length > 0) {
      const selectedAmenities = await Amenities.findAll({
        where: { amen_name: selectedAmenityNames },
      });
      await party.addAmenities(selectedAmenities);
    }
    console.log("tags: ", tags);
    console.log("amenities: ", amenities);
    res.send(party);
  } catch (error) {
    console.log(error);
  }
};

exports.partyDetail = async (req, res) => {
  const party_num = req.params.partyId;
  const party = await Parties.findByPk(party_num, {
    include: [Amenities, Tags],
  });
  console.log("clicked Party: ", party);

  res.render("partyDetail", { party });
};
