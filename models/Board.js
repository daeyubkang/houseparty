const { DataTypes } = require("sequelize");

const Model = (sequelize) => {
  return sequelize.define("Board", {
    //컬럼 정의
    board_num: {
      type: DataTypes.INTEGER,
      allowNull: false, //NOT NULL
      primaryKey: true,
      autoIncrement: true,
    },
    id: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    party_location: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    field: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    count: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    tag: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    host_time: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  });
};

module.exports = Model;
