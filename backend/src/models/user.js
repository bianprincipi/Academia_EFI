'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
    role: DataTypes.ENUM('admin','profesor','estudiante'),
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true }
  }, {
    tableName: 'Users',
    freezeTableName: true
  });
  return User;
};
