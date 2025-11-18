// models/subject.js
'use strict';

module.exports = (sequelize, DataTypes) => {
  const Subject = sequelize.define('Subject', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.TEXT,
  }, {
    tableName: 'subjects',
    freezeTableName: true,
    timestamps: true,
  });

  Subject.associate = (models) => {
    // Una materia puede tener muchas clases
    Subject.hasMany(models.Class, {
      foreignKey: 'subjectId',
      as: 'classes',
    });
  };

  return Subject;
};
