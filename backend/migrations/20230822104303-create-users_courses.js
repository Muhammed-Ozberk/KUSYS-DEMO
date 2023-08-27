'use strict';

/** 
 * This script is a Sequelize migration.
 * It defines how to create and drop the 'UsersCourses' table in the database.
 * @type {import('sequelize-cli').Migration} 
 */
module.exports = {
  // The 'up' function defines how to create the table
  async up(queryInterface, Sequelize) {
    // Using queryInterface to create the 'UsersCourses' table with specified columns
    await queryInterface.createTable('UsersCourses', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      studentID: Sequelize.STRING,
      firstName: Sequelize.STRING,
      courseID: Sequelize.STRING,
      courseName: Sequelize.STRING,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  // The 'down' function defines how to drop the table if needed
  async down(queryInterface, Sequelize) {
    // Using queryInterface to drop the 'UsersCourses' table
    await queryInterface.dropTable('UsersCourses');
  }
};
