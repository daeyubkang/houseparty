const { Users, Parties } = require("../models");

exports.index = async (req, res) => {
  try {
    const Partiess = await Parties.findAll({
      attributes: ["title", "id", "party_num"],
    });
    console.log(Partiess);
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
