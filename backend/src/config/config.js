'use strict';

const path = require('path');
require('dotenv').config({
  path: path.join(__dirname, '..', '.env'),
});

// Esto es solo para debug: ver qué está leyendo
console.log('DB_USER desde .env →', process.env.DB_USER);
console.log('DB_NAME desde .env →', process.env.DB_NAME);

module.exports = {
  development: {
    username: process.env.DB_USER || 'academia_user',
    password: process.env.DB_PASS || 'academia123',
    database: process.env.DB_NAME || 'academia_efi',
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    dialect: 'mysql',
    logging: false,
  },
  test: {
    username: process.env.DB_USER || 'academia_user',
    password: process.env.DB_PASS || 'academia123',
    database: (process.env.DB_NAME || 'academia_efi') + '_test',
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    dialect: 'mysql',
    logging: false,
  },
  production: {
    username: process.env.DB_USER || 'academia_user',
    password: process.env.DB_PASS || 'academia123',
    database: process.env.DB_NAME || 'academia_efi',
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    dialect: 'mysql',
    logging: false,
  },
};
