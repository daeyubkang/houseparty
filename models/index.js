"use strict";

const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

//모델
//db에 User생성
db.Users = require("./Users")(sequelize);
db.Parties = require("./Parties")(sequelize);

db.Chat = require("./Chat")(sequelize);
db.ChatMessage = require("./ChatMessage")(sequelize);

db.Amenities = require("./Amenities")(sequelize);
db.Tags = require("./Tags")(sequelize);
db.Images = require("./Images")(sequelize);

// const model = require('./User');
// const temp = model(sequelize);
// db.User = temp;

//1:다
db.Users.hasMany(db.Parties);
db.Parties.belongsTo(db.Users);

// db.Parties.hasMany(db.Chat);
// db.Chat.belongsTo(db.Parties);

db.Chat.hasMany(db.ChatMessage);
db.ChatMessage.belongsTo(db.Chat);

db.Parties.hasMany(db.Images, {
  foreignKey: "party_num",
});
db.Images.belongsTo(db.Parties, {
  foreignKey: "party_num",
  onDelete: "CASCADE",
});

//다대다

db.Parties.belongsToMany(db.Amenities, { through: "PartyAmenities" });
db.Amenities.belongsToMany(db.Parties, { through: "PartyAmenities" });

db.Parties.belongsToMany(db.Tags, { through: "PartyTags" });
db.Tags.belongsToMany(db.Parties, { through: "PartyTags" });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
