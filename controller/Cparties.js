const { Users, Parties, Amenities } = require("../models");

exports.index = async (req, res) => {
  const allPartyTitles = await Parties.findAll({
    attributes: ["title"],
  });
  console.log(allPartyTitles);
  res.render("parties", { allPartyTitles });
};

exports.hostParty = (req, res) => {
  res.render("host");
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
      tag,
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
      tag,
      party_location,
    });

    const selectedAmenityIds = amenities;
    if (selectedAmenityIds.length > 0) {
      const selectedAmenities = await Amenities.findAll({
        where: { amen_num: selectedAmenityIds },
      });
      await party.addAmenities(selectedAmenities);
    }
    console.log("amenities: ", amenities);
    res.send(party);
  } catch (error) {
    console.log(error);
  }
};
