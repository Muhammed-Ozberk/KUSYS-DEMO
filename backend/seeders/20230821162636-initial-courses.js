'use strict';

/** 
 * This script is a Sequelize migration.
 * It defines how to insert initial data into the 'Courses' table and how to roll it back.
 * @type {import('sequelize-cli').Migration} 
 */
module.exports = {
  // The 'up' function defines how to insert initial data into the 'Courses' table
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Courses', [
      { courseID: "CSI101", courseName: 'Introduction to Computer Science', createdAt: new Date(), updatedAt: new Date() },
      { courseID: "CSI102", courseName: 'Algorithms', createdAt: new Date(), updatedAt: new Date() },
      { courseID: "MAT101", courseName: 'Calculus', createdAt: new Date(), updatedAt: new Date() },
      { courseID: "PHY101", courseName: 'Physics', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  // The 'down' function defines how to delete the inserted data during rollback
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Courses', null, {});
  }
};
