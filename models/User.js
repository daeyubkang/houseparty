const { DataTypes } = require("sequelize");

const Model = (sequelize) => {
  return sequelize.define("homeParty", {
    //컬럼 정의
    user_num: {
      type: DataTypes.INTEGER,
      allowNull: false, //NOT NULL
      primaryKey: true,
      autoIncrement: true,
    },
    userid: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    pw: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    phoneNum: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    region: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    favorite: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  });
};

module.exports = Model;
