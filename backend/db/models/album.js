'use strict';
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define('Album', {
    albumName: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Album.associate = function(models) {
    const columnMapping = {
      through: 'PhotoAlbum',
      foreignKey: 'albumId',
      otherKey: 'photoId',
      onDelete: 'CASCADE',
      hooks: true
    }

    Album.belongsTo(models.User, {foreignKey: 'userId'})
    Album.belongsToMany(models.Photo, columnMapping)
  };
  return Album;
};
