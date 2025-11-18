// models/class.js
'use strict';

module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define('Class', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    subjectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    teacherId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    schedule: {
      type: DataTypes.STRING, // Ej: "Lunes 8:00 - 10:00"
      allowNull: true,
    },
    room: {
      type: DataTypes.STRING, // Ej: "Aula 5"
      allowNull: true,
    },
  }, {
    tableName: 'Classes',
    freezeTableName: true,
    timestamps: false,
  });

  Class.associate = (models) => {
    // Una clase tiene muchas inscripciones
    Class.hasMany(models.Enrollment, {
      foreignKey: 'classId',
      as: 'enrollments',
    });

    // Una clase pertenece a una materia
    Class.belongsTo(models.Subject, {
      foreignKey: 'subjectId',
      as: 'subject',
    });

    // Una clase pertenece a un profesor (User)
    Class.belongsTo(models.User, {
      foreignKey: 'teacherId',
      as: 'teacher',
    });
  };

  return Class;
};
