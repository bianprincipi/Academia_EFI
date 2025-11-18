// src/models/career.js
'use strict';

module.exports = (sequelize, DataTypes) => {
  const Career = sequelize.define(
    'Career',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      durationYears: {
        type: DataTypes.INTEGER,
        allowNull: true, // ej: 2, 3, 5 años
      },
    },
    {
      tableName: 'Careers',
      freezeTableName: true,
      timestamps: true, // createdAt, updatedAt
    }
  );

  // ⚠️ Las asociaciones las vamos a definir en src/models/index.js
  // para evitar duplicar y que Sequelize se queje.
  return Career;
};

