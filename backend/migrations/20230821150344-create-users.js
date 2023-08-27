'use strict';

/** 
 * This script is a Sequelize migration.
 * It defines how to create and drop the 'Users' table in the database.
 * @type {import('sequelize-cli').Migration} 
 */
module.exports = {
  // The 'up' function defines how to create the table
  async up (queryInterface, Sequelize) {
    // Using queryInterface to create the 'Users' table with specified columns
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      studentID: Sequelize.STRING,
      firstName: Sequelize.STRING,
      lastName: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.STRING,
      birthDay: Sequelize.STRING,
      isAdmin: Sequelize.BOOLEAN,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  // The 'down' function defines how to drop the table if needed
  async down (queryInterface, Sequelize) {
    // Using queryInterface to drop the 'Users' table
    await queryInterface.dropTable('Users');
  }
};
