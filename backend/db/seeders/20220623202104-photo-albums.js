'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('PhotoAlbums', [
        {photoId: 1, albumId: 1, createdAt: new Date(), updatedAt: new Date()},
        {photoId: 2, albumId: 1, createdAt: new Date(), updatedAt: new Date()},
        {photoId: 3, albumId: 1, createdAt: new Date(), updatedAt: new Date()},
        {photoId: 4, albumId: 1, createdAt: new Date(), updatedAt: new Date()},
        {photoId: 5, albumId: 1, createdAt: new Date(), updatedAt: new Date()}
    ], {});

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
