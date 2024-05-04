'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
    */
    await queryInterface.bulkInsert('users', [
      {
        name: "Joko Bieber",
        profession: "Admin Micro",
        role: "admin",
        email: "bwa@yopmail.com",
        password: await bcrypt.hash('password', 10),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Titi Maemunah",
        profession: "Front End Developer",
        role: "student",
        email: "titimae@yopmail.com",
        password: await bcrypt.hash('password', 10),
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
