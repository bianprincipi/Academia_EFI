'use strict';
module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define('Class', {
    subjectId: DataTypes.INTEGER,
    teacherId: DataTypes.INTEGER,
    schedule: DataTypes.STRING,
    room: DataTypes.STRING
  }, {
    tableName: 'Classes',
    freezeTableName: true
  });
  return Class;
};
