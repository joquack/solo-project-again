'use strict';
module.exports = (sequelize, DataTypes) => {
  const Photo = sequelize.define('Photo', {
    userId: DataTypes.INTEGER,
    photoName: DataTypes.STRING(24),
    source: DataTypes.TEXT
  }, {});
  Photo.associate = function(models) {
    const columnMapping = {
      through: 'PhotoAlbum',
      foreignKey: 'photoId',
      otherKey: 'albumId',
      onDelete: 'CASCADE',
      hooks: true
    }

    Photo.belongsTo(models.User, {foreignKey: 'userId'})
    Photo.belongsToMany(models.Album, columnMapping)
    Photo.hasMany(models.Comment, {foreignKey: 'photoId', onDelete:'CASCADE', hooks: true})
  };
  return Photo;
};
