'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Photos', [
        {userId:2, photoName: 'duck1', source: 'https://cdn.shopify.com/s/files/1/0506/2384/0409/products/a2ccaad3-df2c-49d3-9357-db8e5f4522e6_1024x1024@2x.jpg?v=1606149305', createdAt: new Date(), updatedAt: new Date()},
        {userId:2, photoName: 'duck2', source: 'https://bloximages.chicago2.vip.townnews.com/dailyrecordnews.com/content/tncms/assets/v3/editorial/b/8f/b8f75003-5e22-57cf-a02f-6c4656f59b2f/5f52a398a9c8b.image.jpg?crop=720%2C720%2C280%2C0&resize=1200%2C1200&order=crop%2Cresize', createdAt: new Date(), updatedAt: new Date()},
        {userId:2, photoName: 'duck3', source: 'http://www.swartzentrover.com/cotor/Photos/Hiking/AlmansorDucks/AlmansorDucks36/IMGP1956.jpg', createdAt: new Date(), updatedAt: new Date()},
        {userId:3, photoName: 'duck4', source: 'https://i.ytimg.com/vi/mYaZSwfFDU4/hqdefault.jpg?sqp=-oaymwEXCOADEI4CSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLDpHfwiqlsADQHmGO3sqwZwfDHJfw', createdAt: new Date(), updatedAt: new Date()},
        {userId:3, photoName: 'duck5', source: 'https://i0.wp.com/ryuzoarts.com/wp-content/uploads/2020/09/IMG_7763-1.jpg?resize=840%2C474&ssl=1', createdAt: new Date(), updatedAt: new Date()}
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
