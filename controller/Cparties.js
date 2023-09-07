const { Users, Parties, Amenities, Tags } = require("../models");

exports.index = async (req, res) => {
  const allPartyTitles = await Parties.findAll({
    attributes: ["party_num", "title"],
  });
  //console.log(allPartyTitles);
  res.render("parties", { allPartyTitles });
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
