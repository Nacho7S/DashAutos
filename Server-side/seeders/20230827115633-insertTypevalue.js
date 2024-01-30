'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Types", [
      {
        name: "Coupe",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "HatchBack",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Convertible",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Sedan",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Sport Car",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Station Wagon",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "SUV",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "MiniVan",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "LMPV",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Pickup Truck",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Types", null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
