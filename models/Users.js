const { DataTypes } = require("sequelize");

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
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    hobby: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    birth: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });
};

module.exports = Model;
