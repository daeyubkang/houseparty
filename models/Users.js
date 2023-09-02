const { DataTypes} = require("sequelize");

const Model = (sequelize) => {
  return sequelize.define("users", {
    //컬럼 정의
    user_num: {
      type: DataTypes.INTEGER,
      allowNull: false, //NOT NULL
      primaryKey: true,
      autoIncrement: true,
    },
    id: {
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
      type: DataTypes.CHAR(1),
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING(),
      allowNull: true,
    },
    hobby: {
      type: DataTypes.STRING(1),
      allowNull: true,
    },
  });
};

module.exports = Model;
