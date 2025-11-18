require('dotenv').config({ path: '../.env' });

const express = require('express');
const app = express();
app.get('/', (req,res)=> res.send('MIN API OK'));
const PORT = Number(process.env.PORT || 3001);
app.listen(PORT, ()=> console.log('MIN API on :' + PORT));
