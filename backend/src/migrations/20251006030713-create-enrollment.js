'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Enrollments', {
      id:        { allowNull:false, autoIncrement:true, primaryKey:true, type:Sequelize.INTEGER },
      userId:    { type:Sequelize.INTEGER, allowNull:false,
                   references:{ model:'Users',   key:'id' }, onDelete:'CASCADE' },
      classId:   { type:Sequelize.INTEGER, allowNull:false,
                   references:{ model:'Classes', key:'id' }, onDelete:'CASCADE' },
      enrolledAt:{ type:Sequelize.DATE, allowNull:false, defaultValue: Sequelize.fn('NOW') },
      createdAt: { allowNull:false, type:Sequelize.DATE },
      updatedAt: { allowNull:false, type:Sequelize.DATE }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Enrollments');
  }
};
