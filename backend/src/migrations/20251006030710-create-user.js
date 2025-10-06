'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id:        { allowNull:false, autoIncrement:true, primaryKey:true, type:Sequelize.INTEGER },
      name:      { type:Sequelize.STRING,  allowNull:false },
      email:     { type:Sequelize.STRING,  allowNull:false, unique:true },
      password:  { type:Sequelize.STRING,  allowNull:false },
      role:      { type:Sequelize.ENUM('admin','profesor','estudiante'), allowNull:false, defaultValue:'estudiante' },
      isActive:  { type:Sequelize.BOOLEAN, allowNull:false, defaultValue:true },
      createdAt: { allowNull:false, type:Sequelize.DATE },
      updatedAt: { allowNull:false, type:Sequelize.DATE }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Users');
  }
};
