const { User, Board } = require("../models");

exports.index = async (req, res) => {
  try {
    const boards = await Board.findAll({
      attributes: ["title", "id"],
    });
    console.log(boards);
    res.render("parties", { board: boards });
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
      content,
      count,
      field,
      image,
      tag,
      host_time,
      party_location,
    } = req.body;
    const board = await Board.create({
      id,
      title,
      content,
      field,
      count,
      image,
      tag,
      host_time,
      party_location,
    });
    console.log(board);
    res.send(board);
  } catch (error) {
    console.log(error);
  }
};
