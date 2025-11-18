// models/careersubject.js
'use strict';

module.exports = (sequelize, DataTypes) => {
  const CareerSubject = sequelize.define('CareerSubject', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    careerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subjectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'CareerSubjects',
    freezeTableName: true,
    timestamps: true,
  });

  CareerSubject.associate = (models) => {
    CareerSubject.belongsTo(models.Career, {
      foreignKey: 'careerId',
      as: 'career',
    });

    CareerSubject.belongsTo(models.Subject, {
      foreignKey: 'subjectId',
      as: 'subject',
    });
  };

  return CareerSubject;
};
