// src/models/attendance.js
module.exports = (sequelize, DataTypes) => {
  const Attendance = sequelize.define(
    'Attendance',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        // estudiante
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      classId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW, // día de hoy por defecto
      },
      status: {
        type: DataTypes.ENUM('present', 'absent', 'late'),
        allowNull: false,
        defaultValue: 'present',
      },
    },
    {
      tableName: 'attendances',
      timestamps: true,
    }
  );

  return Attendance;
};
