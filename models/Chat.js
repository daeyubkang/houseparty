const { DataTypes } = require("sequelize");

const Model = (sequelize) => {
  return sequelize.define("chats", {
    //컬럼 정의
    chat_key: {
      type: DataTypes.INTEGER,
      allowNull: false, //NOT NULL
      primaryKey: true,
      autoIncrement: true,
    },
    board_num: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    participant_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    host_id: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  });
};

module.exports = Model;
