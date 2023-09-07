const { DataTypes } = require("sequelize");

const Model = (sequelize) => {
  return sequelize.define("chat_messages", {
    //컬럼 정의
    chat_message_num: {
      type: DataTypes.INTEGER,
      allowNull: false, //NOT NULL
      primaryKey: true,
      autoIncrement: true,
    },
    chat_key: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    send_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    send_message: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  });
};

module.exports = Model;
