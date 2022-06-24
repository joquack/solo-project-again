'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Comments', [
        {userId: 1, photoId: 1, body: 'very cool', createdAt: new Date(), updatedAt: new Date()},
        {userId: 2, photoId: 1, body: 'nice', createdAt: new Date(), updatedAt: new Date()},
        {userId: 3, photoId: 1, body: 'epic duck', createdAt: new Date(), updatedAt: new Date()},
        {userId: 1, photoId: 2, body: 'wowie', createdAt: new Date(), updatedAt: new Date()},
        {userId: 2, photoId: 2, body: 'bruhruhbruhbruhbruhbruhbh', createdAt: new Date(), updatedAt: new Date()},
        {userId: 3, photoId: 3, body: 'quack quack', createdAt: new Date(), updatedAt: new Date()},
        {userId: 1, photoId: 3, body: 'awesome duck :)', createdAt: new Date(), updatedAt: new Date()}
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
