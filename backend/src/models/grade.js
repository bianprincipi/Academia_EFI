// src/models/grade.js
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
        allowNull: false,
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

  return Grade;
};
