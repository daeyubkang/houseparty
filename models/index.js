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
db.User = require("./User")(sequelize);
db.Board = require("./Board")(sequelize);
// const model = require('./User');
// const temp = model(sequelize);
// db.User = temp;

//1:다
db.User.hasMany(db.Board);
db.Board.belongsTo(db.User);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
