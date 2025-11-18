// models/user.js
'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
    role: DataTypes.ENUM('admin', 'profesor', 'estudiante'),
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
  }, {
    tableName: 'Users',
    freezeTableName: true,
  });

  User.associate = (models) => {
    // Un usuario (estudiante) puede tener muchas inscripciones
    User.hasMany(models.Enrollment, {
      foreignKey: 'userId',
      as: 'enrollments',
    });

    // Un usuario también puede ser profesor de muchas clases
    User.hasMany(models.Class, {
      foreignKey: 'teacherId',
      as: 'classesAsTeacher',
    });
  };

  return User;
};
