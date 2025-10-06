'use strict';
module.exports = (sequelize, DataTypes) => {
  const PasswordReset = sequelize.define('PasswordReset', {
    userId: DataTypes.INTEGER,
    token: DataTypes.STRING,
    expiresAt: DataTypes.DATE,
    used: DataTypes.BOOLEAN
  }, {
    tableName: 'PasswordResets',
    freezeTableName: true
  });
  return PasswordReset;
};
