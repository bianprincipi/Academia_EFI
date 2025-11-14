require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// 👉 Importamos sequelize desde /models
const { sequelize } = require('./models');

// 👉 Rutas
app.use('/auth', require('./routes/auth.routes'));
app.use('/users', require('./routes/users.routes'));
app.use('/subjects', require('./routes/subjects.routes'));
app.use('/classes', require('./routes/classes.routes'));
app.use('/enrollments', require('./routes/enrollments.routes'));
app.use('/reports', require('./routes/reports.routes'));
app.use('/grades', require('./routes/grades.routes'));
app.use('/attendance', require('./routes/attendance.routes'));

// Ruta básica para verificar servidor
app.get('/', (req, res) => res.send('API OK'));

// Puerto
const PORT = Number(process.env.PORT || 3001);

// 🔥 Sincronizar base de datos ANTES de levantar la API
sequelize
  .authenticate()
  .then(() => {
    console.log('✅ Conexión a MySQL correcta');

    // ⚠️ solo crear tablas si no existen (seguro)
    return sequelize.sync({ alter: false });
  })
  .then(() => {
    console.log('🗄️ Base de datos sincronizada');
    app.listen(PORT, () => console.log(`🚀 API corriendo en puerto ${PORT}`));
  })
  .catch((err) => {
    console.error('❌ Error al iniciar la base de datos:', err);
  });

