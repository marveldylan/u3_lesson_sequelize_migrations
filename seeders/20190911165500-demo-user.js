'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
        first_name: 'John',
        last_name: 'Doe',
        email: 'demo@demo.com',
        created_at: new Date(),
        updated_at: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};