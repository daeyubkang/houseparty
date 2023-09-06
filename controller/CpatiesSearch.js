const { Parties } = require("../models");
const { Op } = require("sequelize");

exports.search = async (req, res) => {
  console.log(req.query.q);
  const search = req.query.q;
  const partiesSearch = await Parties.findAll({
    attributes: ["title", "id", "party_num", "start_time", "tag", "createdAt"],
    where: {
      // title 또는 tag에서 검색어를 포함하는 경우 가져옵니다.
      [Op.or]: [
        { title: { [Op.like]: `%${search}%` } },
        { tag: { [Op.like]: `%${search}%` } },
      ],
    },
  });
  const tag = await Parties.findAll({
    attributes: ["tag"],
  });
  console.log("검색결과", partiesSearch);
  res.render("partiesSearch", { parties: partiesSearch, tag: tag });
};
