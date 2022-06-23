'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PhotoAlbums', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      photoId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'Photos'}
      },
      albumId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'Albums'}
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('PhotoAlbums');
  }
};
