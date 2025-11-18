// src/models/enrollment.js
'use strict';

module.exports = (sequelize, DataTypes) => {
  const Enrollment = sequelize.define(
    'Enrollment',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      classId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      enrolledAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: 'Enrollments',
      freezeTableName: true,
      // 👇 Dejamos que Sequelize maneje createdAt / updatedAt
      timestamps: true,
    }
  );

  // Las asociaciones ya las estamos definiendo en src/models/index.js
  // para no duplicar alias y evitar errores de Sequelize.

  return Enrollment;
};
