// src/models/grade.js
'use strict';

module.exports = (sequelize, DataTypes) => {
  const Grade = sequelize.define(
    'Grade',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false, // estudiante
      },
      classId: {
        type: DataTypes.INTEGER,
        allowNull: false, // clase
      },
      grade: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: 'grades',
      timestamps: true,
    }
  );

  Grade.associate = (models) => {
    // 👇 alias ÚNICO para el estudiante de la nota
    Grade.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'gradeStudent',
    });

    Grade.belongsTo(models.Class, {
      foreignKey: 'classId',
      as: 'class',
    });
  };

  return Grade;
};
