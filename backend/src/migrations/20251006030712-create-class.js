'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Classes', {
      id:        { allowNull:false, autoIncrement:true, primaryKey:true, type:Sequelize.INTEGER },
      subjectId: { type:Sequelize.INTEGER, allowNull:false,
                   references:{ model:'Subjects', key:'id' }, onDelete:'CASCADE' },
      teacherId: { type:Sequelize.INTEGER, allowNull:false,
                   references:{ model:'Users',    key:'id' }, onDelete:'CASCADE' },
      schedule:  { type:Sequelize.STRING },
      room:      { type:Sequelize.STRING },
      createdAt: { allowNull:false, type:Sequelize.DATE },
      updatedAt: { allowNull:false, type:Sequelize.DATE }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Classes');
  }
};
