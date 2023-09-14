const { DataTypes } = require("sequelize");

const Model = (sequelize) => {
  return sequelize.define("amenities", {
    //컬럼 정의
    amen_num: {
      type: DataTypes.INTEGER,
      allowNull: false, //NOT NULL
      primaryKey: true,
      autoIncrement: true,
    },
    amen_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amen_category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

module.exports = Model;
