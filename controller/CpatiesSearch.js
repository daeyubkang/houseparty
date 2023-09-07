const { Parties } = require("../models");
const { Op } = require("sequelize");

exports.search = async (req, res) => {
  console.log(req.query.q);
  const search = req.query.q;
  const searchTerms = search.split(","); //","를 기준으로 나눔
  console.log("찾을 값", searchTerms);
  const findWhere = []; //검색 조건 저장할 배열
  for (let i = 0; i < searchTerms.length; i++) {
    const term = searchTerms[i];
    findWhere.push({
      [Op.or]: [
        { title: { [Op.like]: `%${term}%` } },
        { tag: { [Op.like]: `%${term}%` } },
      ],
    });
  }
  const partiesSearch = await Parties.findAll({
    attributes: ["title", "id", "party_num", "start_time", "tag", "createdAt"],
    where: {
      // title 또는 tag에서 검색어를 포함하는 경우 가져옵니다.
      [Op.or]: findWhere,
    },
  });

  const tag = await Parties.findAll({
    attributes: ["tag"],
  });
  console.log("검색결과", partiesSearch);
  res.render("partiesSearch", { parties: partiesSearch, tag: tag });
};
