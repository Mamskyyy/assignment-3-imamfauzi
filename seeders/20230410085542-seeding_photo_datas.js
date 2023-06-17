"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Photos",
      [
        {
          title: "Foto Lebaran",
          caption: "foto ini diambil waktu lebaran tahun 2021 dirumah ibu",
          image_url: "https://photolebaran.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Foto Anak",
          caption: "foto ini ketika kamu masih umur 5 tahun",
          image_url: "https://photoanak.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Foto Keluarga",
          caption: "foto ini diambil dirumah keluarga besar ayah",
          image_url: "https://photokeluarga.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Foto Pernikahan",
          caption: "foto ini diambil waktu kita sudah menikah",
          image_url: "https://photomenikah.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
