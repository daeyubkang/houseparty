const { DataTypes } = require("sequelize");

const Model = (sequelize) => {
  return sequelize.define("images", {
    //컬럼 정의
    img_num: {
      type: DataTypes.INTEGER,
      allowNull: false, //NOT NULL
      primaryKey: true,
      autoIncrement: true,
    },
    img_URL: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

module.exports = Model;
