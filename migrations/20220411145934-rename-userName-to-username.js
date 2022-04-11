'use strict';

module.exports = {
 up: (queryInterface, Sequelize) => {
   return queryInterface.renameColumn('users', 'userName', 'username')
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('users', 'username', 'userName')
  }
};
