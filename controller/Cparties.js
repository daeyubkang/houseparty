const { Parties } = require("../models");

exports.index = (req, res) => {
  res.render("parties");
};

exports.hostParty = (req, res) => {
  res.render("host");
};

exports.hostPartyPost = async (req, res) => {
  try {
    console.log("reqbody: ", req.body);
    const { party_num, title, description, date, startTime, endTime } =
      req.body;
    const party = await Parties.create({
      party_num,
      title,
      description,
      date,
      startTime,
      endTime,
    });
    console.log(party);
    res.send(party);
  } catch (error) {
    console.log(error);
  }
};
