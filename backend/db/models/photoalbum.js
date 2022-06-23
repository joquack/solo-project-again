'use strict';
module.exports = (sequelize, DataTypes) => {
  const PhotoAlbum = sequelize.define('PhotoAlbum', {
    photoId: DataTypes.INTEGER,
    albumId: DataTypes.INTEGER
  }, {});
  PhotoAlbum.associate = function(models) {
    // associations can be defined here
  };
  return PhotoAlbum;
};