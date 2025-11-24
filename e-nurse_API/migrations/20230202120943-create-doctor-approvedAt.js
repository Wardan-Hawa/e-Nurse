'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
  
    await queryInterface.addColumn('Users', 'approvedAt', {
      type: Sequelize.DATE,
      defaultValue: null
    });
  },

  async down (queryInterface, Sequelize) {
  
    await queryInterface.removeColumn('Users', 'approvedAt');
  }
};
