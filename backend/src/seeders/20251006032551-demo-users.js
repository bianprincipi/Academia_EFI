'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up (queryInterface) {
    const hash = async (p)=> await bcrypt.hash(p,10);
    await queryInterface.bulkInsert('Users', [
      { name:'Admin',     email:'admin@uni.test', password: await hash('Admin123!'), role:'admin',      isActive:true, createdAt:new Date(), updatedAt:new Date() },
      { name:'Prof. Ana', email:'ana@uni.test',   password: await hash('Prof123!'),  role:'profesor',   isActive:true, createdAt:new Date(), updatedAt:new Date() },
      { name:'Est. Beto', email:'beto@uni.test',  password: await hash('Est123!'),   role:'estudiante', isActive:true, createdAt:new Date(), updatedAt:new Date() },
      { name:'Est. Cami', email:'cami@uni.test',  password: await hash('Est123!'),   role:'estudiante', isActive:true, createdAt:new Date(), updatedAt:new Date() },
    ], {});
  },
  async down (queryInterface) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
