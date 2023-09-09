const { DataTypes } = require("sequelize");

const Model = (sequelize) => {
  return sequelize.define("tags", {
    //컬럼 정의
    tag_num: {
      type: DataTypes.INTEGER,
      allowNull: false, //NOT NULL
      primaryKey: true,
      autoIncrement: true,
    },
    tag_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tag_category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tag_category_num: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};

module.exports = Model;
