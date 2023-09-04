const { Users, Parties } = require("../models");

exports.index = (req, res) => {
  res.render("parties");
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
      head_count,
      date,
      image,
      tag,
      start_time,
      party_location,
    } = req.body;
    const party = await Parties.create({
      id,
      title,
      description,
      head_count,
      date,
      image,
      tag,
      start_time,
      party_location,
    });
    console.log(party);
    res.send(party);
  } catch (error) {
    console.log(error);
  }
};
