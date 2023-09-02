exports.index = (req, res) => {
  res.render("parties");
};

exports.hostParty = (req, res) => {
  res.render("host");
};
