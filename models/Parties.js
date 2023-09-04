const { DataTypes } = require("sequelize");

const Parties = (sequelize) => {
  return sequelize.define("parties", {
    //컬럼 정의
    party_num: {
      type: DataTypes.INTEGER,
      allowNull: false, //NOT NULL
      primaryKey: true,
      autoIncrement: true,
    },

    user_num: {
      type: DataTypes.INTEGER,
      allowNull: true, //NOT NULL
      primaryKey: false,
      autoIncrement: false,
    },

    title: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    startTime: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    endTime: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
  });
};

module.exports = Parties;
