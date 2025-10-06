require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', require('./routes/auth.routes'));
app.use('/users', require('./routes/users.routes'));
app.use('/subjects', require('./routes/subjects.routes'));
app.use('/classes', require('./routes/classes.routes'));
app.use('/enrollments', require('./routes/enrollments.routes'));
app.use('/reports', require('./routes/reports.routes'));


app.get('/', (req,res)=> res.send('API OK'));

const PORT = Number(process.env.PORT || 3001);
app.listen(PORT, ()=> console.log('API on :' + PORT));
