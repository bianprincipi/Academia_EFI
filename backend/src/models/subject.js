'use strict';
module.exports = (sequelize, DataTypes) => {
  const Subject = sequelize.define('Subject', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    tableName: 'Subjects',
    freezeTableName: true
  });
  return Subject;
};
