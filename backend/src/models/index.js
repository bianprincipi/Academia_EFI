'use strict';
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '../config/config.js'))[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Carga todos los modelos .js excepto index.js
fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// ASOCIACIONES

const { User, Subject, Class, Enrollment, PasswordReset } = db;

// User asociaciones
if (User) {
  User.hasMany(Class, { foreignKey: 'teacherId', as: 'teaching' });
  User.hasMany(Enrollment, { foreignKey: 'userId' });
  User.hasMany(PasswordReset, { foreignKey: 'userId' });
}

// Subject asociaciones
if (Subject) {
  Subject.hasMany(Class, { foreignKey: 'subjectId' });
}

// Class asociaciones
if (Class) {
  Class.belongsTo(Subject, { foreignKey: 'subjectId' });
  Class.belongsTo(User, { as: 'teacher', foreignKey: 'teacherId' });
  Class.hasMany(Enrollment, { foreignKey: 'classId' });
}

// Enrollment asociaciones
if (Enrollment) {
  Enrollment.belongsTo(User, { foreignKey: 'userId' });
  Enrollment.belongsTo(Class, { foreignKey: 'classId' });
}

// PasswordReset asociaciones
if (PasswordReset) {
  PasswordReset.belongsTo(User, { foreignKey: 'userId', as: 'user' });
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;