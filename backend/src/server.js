// src/server.js
require('dotenv').config(); // va a leer src/.env porque ejecutás desde src normalmente
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const { sequelize } = require('./models');

// Rutas
app.use('/auth', require('./routes/auth.routes'));
app.use('/users', require('./routes/users.routes'));
app.use('/subjects', require('./routes/subjects.routes'));
app.use('/classes', require('./routes/classes.routes'));
app.use('/enrollments', require('./routes/enrollments.routes'));
app.use('/reports', require('./routes/reports.routes'));
app.use('/grades', require('./routes/grades.routes'));
app.use('/careers', require('./routes/careers.routes'));

app.get('/', (req, res) => res.send('API OK'));

const PORT = Number(process.env.PORT || 3000);

sequelize
  .sync()
  .then(() => {
    console.log('🗄️ DB sincronizada');
    app.listen(PORT, () => console.log('API on :' + PORT));
  })
  .catch((err) => {
    console.error('❌ Error al sincronizar la base de datos:', err.message);
  });

module.exports = app;
