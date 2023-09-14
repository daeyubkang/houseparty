const { Users, Parties, Amenities, Tags, Images } = require("../models");

exports.index = async (req, res) => {
  try {
    const parties = await Parties.findAll({
      include: [Tags, Amenities, Images],
    });
    const allTags = await Tags.findAll({
      attributes: ["tag_num", "tag_name", "tag_category", "tag_category_num"],
    });
    // console.log("게시글 불러오기 성공", Partiess);
    res.render("parties", { parties, allTags });
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
  const allTags = await Tags.findAll({});
  const allAmens = await Amenities.findAll({});
  //console.log(allTags);

  res.render("host", { allTags, allAmens, isEdit: false });
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
      imgURLs,
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

    const images = await Images.bulkCreate(
      imgURLs.map((imgURL) => ({
        img_URL: imgURL,
        party_num: party.party_num,
      }))
    );

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

    //받은(업로드한) 이미지URL값을 파티 정보에 추가
    // const uploadedImgURLs = imgURLs;
    // if (uploadedImgURLs.length > 0) {
    //   const uploadedURLs = await Images.findAll({
    //     where: { img_URL: uploadedImgURLs },
    //   });
    //   await party.addImages(uploadedURLs);
    // }

    console.log("tags: ", tags);
    console.log("amenities: ", amenities);
    res.send(party);
  } catch (error) {
    console.log(error);
  }
};

exports.partyDetail = async (req, res) => {
  const party_num = req.params.partyNum;
  console.log("Param Party Num: ", party_num);
  const party = await Parties.findByPk(party_num, {
    include: [Amenities, Tags, Images],
  });
  //console.log("clicked Party: ", party);

  res.render("partyDetail", { party });
};

exports.editParty = async (req, res, next) => {
  try {
    const party_num = req.params.partyNum;

    const party = await Parties.findByPk(party_num, {
      include: [Amenities, Tags],
    });

    const allTags = await Tags.findAll({});
    const allAmens = await Amenities.findAll({});

    if (party) {
      res.render("host", { party, allTags, allAmens, isEdit: true });
    } else {
      res.render("404");
    }
  } catch (err) {
    console.log(err);
  }
};

exports.editPartyPost = async (req, res) => {
  try {
    console.log("reqbody:", req.body);
    const {
      party_num,
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

    await Parties.update(
      {
        id,
        title,
        description,
        date,
        start_time,
        end_time,
        head_count,
        image,
        party_location,
      },
      { where: { party_num } }
    );

    const updatedParty = await Parties.findByPk(party_num);

    await updatedParty.setTags([]);
    await updatedParty.setAmenities([]);

    //받은(수정된) 태그값을 파티 정보에 새로 추가
    const selectedTagNames = tags;
    if (selectedTagNames.length > 0) {
      const selectedTags = await Tags.findAll({
        where: { tag_name: selectedTagNames },
      });
      console.log("newTags:", selectedTags);
      await updatedParty.addTags(selectedTags);
    }
    //받은(수정된) 어메니티값을 파티 정보에 새로 추가
    const selectedAmenityNames = amenities;
    if (selectedAmenityNames.length > 0) {
      const selectedAmenities = await Amenities.findAll({
        where: { amen_name: selectedAmenityNames },
      });
      await updatedParty.addAmenities(selectedAmenities);
    }
    console.log("tags: ", tags);
    console.log("amenities: ", amenities);
    res.send(updatedParty);
  } catch (error) {
    console.log(error);
  }
};

exports.deleteParty = async (req, res) => {
  const party_num = req.params.partyNum;
  console.log("Delete Party Num: ", party_num);
  const party = await Parties.destroy({
    where: { party_num },
  });
  console.log("delete result", party);
  if (party) {
    res.send("삭제 성공");
  } else {
    res.send("삭제 실패");
  }
};

exports.findTitle = async (req, res) => {
  console.log("hello findTitle: ", req.body.roomID);
  let array = [];
  for (const value of req.body.roomID) {
    const partyname = await Parties.findOne({
      where: { party_num: value },
    });
    array.push({
      title: partyname.title,
      num: partyname.party_num,
      dDay: partyname.date,
    });
  }
  res.send({ result: array });
};
