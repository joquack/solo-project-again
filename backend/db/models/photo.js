'use strict';
module.exports = (sequelize, DataTypes) => {
  const Photo = sequelize.define('Photo', {
    userId: DataTypes.INTEGER,
    photoName: DataTypes.STRING,
    source: DataTypes.TEXT
  }, {});
  Photo.associate = function(models) {
    // associations can be defined here
  };
  return Photo;
};