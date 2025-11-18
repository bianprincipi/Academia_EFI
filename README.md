# 🎓 Sistema de Gestión Académica Universitaria  
Backend – Node.js + Express + MySQL + Sequelize

## 🚀 Tecnologías
- Node.js + Express
- MySQL
- Sequelize ORM
- JWT (auth)
- SendGrid (opcional para recuperación)
- PDFKit (para exportación de reportes)
- Cors / dotenv

---

# 📌 Requisitos
- Node >= 18
- MySQL >= 8
- NPM >= 9
- Entorno Linux/Windows/Mac

---

# ⚙ Instalación

### 1. Clonar repositorio
```bash
git clone <URL>
cd backend
2. Instalar dependencias
bash
Copiar código
npm install
3. Crear archivo .env
ini
Copiar código
NODE_ENV=development
PORT=3001
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=academia_user
DB_PASS=academia123
DB_NAME=academia_efi
JWT_SECRET=supersecreto
PUBLIC_FRONT_URL=http://localhost:5173
4. Crear base de datos
sql
Copiar código
CREATE DATABASE academia_efi;
5. Ejecutar migraciones
bash
Copiar código
npx sequelize-cli db:migrate
6. Ejecutar seeders (si existen)
bash
Copiar código
npx sequelize-cli db:seed:all
▶ Correr servidor
bash
Copiar código
npm run dev
Servidor en:
👉 http://localhost:3001

🔐 Autenticación
JWT mediante:

makefile
Copiar código
Authorization: Bearer <token>
Roles disponibles:

admin

profesor

estudiante

📚 Endpoints Principales (Backend)
🔑 Auth
Método	Ruta	Descripción
POST	/auth/register	Registrar usuario
POST	/auth/login	Login
POST	/auth/forgot-password	Solicitar reset
POST	/auth/reset-password	Resetear contraseña

👤 Users
Método	Ruta	Descripción
GET	/users/profile	Datos del usuario logueado
GET	/users	(admin) listar usuarios

📘 Subjects
Método	Ruta	Descripción
GET	/subjects	Listar
POST	/subjects	Crear (admin)
PUT	/subjects/:id	Editar (admin)
DELETE	/subjects/:id	Eliminar (admin)

🏫 Classes
Método	Ruta	Descripción
GET	/classes	Listar clases
POST	/classes	Crear (admin)
PUT	/classes/:id	Editar (admin/profe)
DELETE	/classes/:id	Eliminar (admin)

📝 Enrollments
Método	Ruta	Descripción
POST	/enrollments	Inscribir
GET	/enrollments/:userId	Ver inscripciones

🧾 Grades
Método	Ruta	Descripción
POST	/grades	Crear nota (profe/admin)
GET	/grades/:userId	Ver notas estudiante
PUT	/grades/:id	Editar nota

🎓 Careers
Método	Ruta	Descripción
GET	/careers	Listar carreras
POST	/careers	Crear carrera (admin)
GET	/careers/:id	Ver carrera
POST	/careers/:id/subjects	Agregar materia
DELETE	/careers/:id/subjects/:subjectId	Quitar materia

🧾 Reports / PDF
Método	Ruta	Descripción
GET	/reports/student-schedule/:id?format=pdf	PDF horario estudiante
GET	/reports/class-enrollments/:classId?format=pdf	PDF inscriptos por clase

☁ Deploy
Backend en Railway
Crear servicio MySQL

Crear servicio NodeJS

Configurar variables del .env

Activar auto deploy desde GitHub

Frontend en Vercel
Subir repo React

Configurar VITE_API_URL

🧑‍💻 Autor
Brisa Rocío Ortolan
Proyecto académico – 2025

yaml
Copiar código

---

# 📜 **6 — Documentación completa de rutas (FORMATO PARA ENTREGA Y EXAMEN)**

Este archivo podés guardarlo como:

`API_DOCUMENTATION.md`

---

## 🚀 API – Documentación Completa

### 🔐 Autenticación
POST /auth/register
POST /auth/login
POST /auth/forgot-password
POST /auth/reset-password

shell
Copiar código

### 👤 Usuarios
GET /users/profile
GET /users

shell
Copiar código

### 📘 Asignaturas
GET /subjects
POST /subjects
PUT /subjects/:id
DELETE /subjects/:id

shell
Copiar código

### 🏫 Clases
GET /classes
POST /classes
PUT /classes/:id
DELETE /classes/:id

shell
Copiar código

### 📝 Inscripciones
POST /enrollments
GET /enrollments/:userId
DELETE /enrollments/:id

shell
Copiar código

### 🧾 Notas
POST /grades
GET /grades/:userId
PUT /grades/:id

shell
Copiar código

### 🎓 Carreras
GET /careers
GET /careers/:id
POST /careers
PUT /careers/:id
DELETE /careers/:id

GET /careers/:id/subjects
POST /careers/:id/subjects
DELETE /careers/:id/subjects/:subjectId




### 🧾 Reportes (PDF)
GET /reports/student-schedule/:id?format=pdf
GET /reports/class-enrollments/:classId?format=pdf



