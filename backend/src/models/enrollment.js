'use strict';
module.exports = (sequelize, DataTypes) => {
  const Enrollment = sequelize.define('Enrollment', {
    userId: DataTypes.INTEGER,
    classId: DataTypes.INTEGER,
    enrolledAt: DataTypes.DATE
  }, {
    tableName: 'Enrollments',
    freezeTableName: true
  });
  return Enrollment;
};
