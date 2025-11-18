'use strict';

const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const basename = path.basename(__filename);
const db = {};

// ⚙️ Variables de entorno
const env = process.env.NODE_ENV || 'development';
const DB_NAME = process.env.DB_NAME || 'academia_efi';
const DB_USER = process.env.DB_USER || 'academia_user';
const DB_PASS = process.env.DB_PASS || 'academia123';
const DB_HOST = process.env.DB_HOST || '127.0.0.1';
const DB_PORT = process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306;

console.log('INICIANDO SEQUELIZE CON:');
console.log('  env      =', env);
console.log('  DB_NAME  =', DB_NAME);
console.log('  DB_USER  =', DB_USER);
console.log('  DB_HOST  =', DB_HOST);
console.log('  DB_PORT  =', DB_PORT);

// 🔌 Creamos la conexión DIRECTAMENTE
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mysql',
  logging: false,
});

// 🚨 Probar conexión
sequelize
  .authenticate()
  .then(() => console.log('✅ Conexión a MySQL OK'))
  .catch((err) => console.error('❌ Error al conectar a MySQL:', err.message));

// Cargar modelos
fs
  .readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js'
  )
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

// Asociaciones
const {
  User,
  Subject,
  Class,
  Enrollment,
  PasswordReset,
  Grade,
  Attendance,
  Career,
} = db;

/** USER **/
if (User) {
  // un profe tiene muchas clases
  User.hasMany(Class, { foreignKey: 'teacherId', as: 'teaching' });

  // un user tiene muchas inscripciones
  User.hasMany(Enrollment, { foreignKey: 'userId', as: 'enrollments' });

  // un user tiene muchas notas
  if (Grade) {
    User.hasMany(Grade, { foreignKey: 'userId', as: 'grades' });
  }

  // un user tiene mucha asistencia
  if (Attendance) {
    User.hasMany(Attendance, { foreignKey: 'userId', as: 'attendances' });
  }
}

/** SUBJECT **/
if (Subject) {
  Subject.hasMany(Class, { foreignKey: 'subjectId', as: 'classes' });
}

/** CLASS **/
if (Class) {
  Class.belongsTo(Subject, { foreignKey: 'subjectId', as: 'subject' });
  Class.belongsTo(User, { foreignKey: 'teacherId', as: 'teacher' });

  Class.hasMany(Enrollment, { foreignKey: 'classId', as: 'enrollments' });

  if (Grade) {
    Class.hasMany(Grade, { foreignKey: 'classId', as: 'grades' });
  }

  if (Attendance) {
    Class.hasMany(Attendance, { foreignKey: 'classId', as: 'attendances' });
  }
}

/** ENROLLMENT **/
if (Enrollment) {
  Enrollment.belongsTo(User, { foreignKey: 'userId', as: 'student' });
  Enrollment.belongsTo(Class, { foreignKey: 'classId', as: 'class' });
}

/** GRADE **/
if (Grade) {
  Grade.belongsTo(User, { foreignKey: 'userId', as: 'student' });
  Grade.belongsTo(Class, { foreignKey: 'classId', as: 'class' });
}

/** ATTENDANCE **/
if (Attendance) {
  Attendance.belongsTo(User, { foreignKey: 'userId', as: 'student' });
  Attendance.belongsTo(Class, { foreignKey: 'classId', as: 'class' });
}

/** PASSWORD RESET **/
if (PasswordReset) {
  PasswordReset.belongsTo(User, { foreignKey: 'userId' });
}

/** CAREER <-> SUBJECT (many-to-many) **/
if (Career && Subject) {
  Career.belongsToMany(Subject, {
    through: 'CareerSubjects',   // nombre de la tabla intermedia
    foreignKey: 'careerId',
    otherKey: 'subjectId',
    as: 'subjects',
  });

  Subject.belongsToMany(Career, {
    through: 'CareerSubjects',
    foreignKey: 'subjectId',
    otherKey: 'careerId',
    as: 'careers',
  });
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
