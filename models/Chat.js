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
    roomID: {
      type: DataTypes.STRING(50),
      allowNull: false, //NOT NULL
    },
    party_num: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    participant_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    host_id: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
  });
};

module.exports = Model;
