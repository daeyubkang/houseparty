exports.index = (req, res) => {
  console.log(req.query);
  res.render("chat", { partiesNum: req.query.partiesNum });
};
