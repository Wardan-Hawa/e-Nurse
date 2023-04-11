'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert("Specialities", [
      {
        name: "Allergy and Immunology",
      },
      {
        name: "Cardiology",
      },
      {
        name: "Dermatology",
      },
      {
        name: "Emergency Medicine",
      },
      {
        name: "Endocrinology",
      },
      {
        name: "Gastroenterology",
      },
      {
        name: "Geriatrics",
      },
      {
        name: "Gynecology and Obstetrics",
      },
      {
        name: "Hematology",
      },
      {
        name: "Infectious Diseases",
      },
      {
        name: "Internal Medicine",
      },
      {
        name: "Neurology",
      },
      {
        name: "Oncology",
      },
      {
        name: "Ophthalmology",
      },
      {
        name: "Orthopedics",
      },
      {
        name: "Pediatrics",
      },
      {
        name: "Psychiatry",
      },
      {
        name: "Pulmonology",
      },
      {
        name: "Radiology",
      },
      {
        name: "Rheumatology",
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Specialities', null, {});
  }
};
