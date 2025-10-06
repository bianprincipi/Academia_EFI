'use strict';
module.exports = {
  async up (queryInterface) {
    await queryInterface.addConstraint('Enrollments', {
      fields: ['userId','classId'],
      type: 'unique',
      name: 'uniq_enroll_user_class'
    });
  },
  async down (queryInterface) {
    await queryInterface.removeConstraint('Enrollments', 'uniq_enroll_user_class');
  }
};
