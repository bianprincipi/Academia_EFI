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

// 🔌 Conexión directa a MySQL (sin config.js)
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mysql',
  logging: false,
});

// 🚨 Probar conexión al arrancar
sequelize
  .authenticate()
  .then(() => {
    console.log('✅ Conexión a MySQL OK');
  })
  .catch((err) => {
    console.error('❌ Error al conectar a MySQL:', err.message);
  });

// 📦 Cargar todos los modelos .js excepto este index.js
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

// 📚 Asociaciones
const { User, Subject, Class, Enrollment, PasswordReset, Grade, Attendance } = db;


if (User && Class) {
  // Un profesor tiene muchas clases
  User.hasMany(Class, {
    foreignKey: 'teacherId',
    as: 'teaching',
  });

  // Un estudiante tiene muchas inscripciones
  User.hasMany(Enrollment, {
    foreignKey: 'userId',
    as: 'enrollments',
  });
}

if (Subject && Class) {
  // Una materia tiene muchas clases
  Subject.hasMany(Class, {
    foreignKey: 'subjectId',
  });
}

if (Class) {
  // Una clase pertenece a una materia
  if (Subject) {
    Class.belongsTo(Subject, {
      foreignKey: 'subjectId',
    });
  }

  // Una clase pertenece a un profesor
  if (User) {
    Class.belongsTo(User, {
      as: 'teacher',
      foreignKey: 'teacherId',
    });
  }

  // Una clase tiene muchas inscripciones
  if (Enrollment) {
    Class.hasMany(Enrollment, {
      foreignKey: 'classId',
    });
  }
}

if (Enrollment) {
  // Una inscripción pertenece a un estudiante
  if (User) {
    Enrollment.belongsTo(User, {
      foreignKey: 'userId',
      as: 'student',
    });
  }

  // Una inscripción pertenece a una clase
  if (Class) {
    Enrollment.belongsTo(Class, {
      foreignKey: 'classId',
    });
  }
}

if (PasswordReset && User) {
  PasswordReset.belongsTo(User, {
    foreignKey: 'userId',
  });
}

if (Grade) {
  Grade.belongsTo(User, { foreignKey: 'userId', as: 'student' });
  Grade.belongsTo(Class, { foreignKey: 'classId' });

  User.hasMany(Grade, { foreignKey: 'userId', as: 'grades' });
  Class.hasMany(Grade, { foreignKey: 'classId', as: 'grades' });
}
if (Attendance) {
  Attendance.belongsTo(User, { foreignKey: 'userId', as: 'student' });
  Attendance.belongsTo(Class, { foreignKey: 'classId' });

  User.hasMany(Attendance, { foreignKey: 'userId', as: 'attendances' });
  Class.hasMany(Attendance, { foreignKey: 'classId', as: 'attendances' });
}


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
