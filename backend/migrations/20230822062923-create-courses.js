'use strict';

/** 
 * This script is a Sequelize migration.
 * It defines how to create and drop the 'Courses' table in the database.
 * @type {import('sequelize-cli').Migration} 
 */
module.exports = {
  // The 'up' function defines how to create the table
  async up(queryInterface, Sequelize) {
    // Using queryInterface to create the 'Courses' table with specified columns
    await queryInterface.createTable('Courses', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      courseID: Sequelize.STRING,
      courseName: Sequelize.STRING,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  // The 'down' function defines how to drop the table if needed
  async down(queryInterface, Sequelize) {
    // Using queryInterface to drop the 'Courses' table
    await queryInterface.dropTable('Courses');
  }
};
