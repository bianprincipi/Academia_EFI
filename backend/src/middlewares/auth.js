// src/middlewares/auth.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    let token = null;

    // 1) Intentar leer el token del header Authorization: Bearer xxx
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.slice(7); // quitamos "Bearer "
    }

    // 2) Si no hay header, intentar leer de la query ?token=xxx
    if (!token && req.query && req.query.token) {
      token = req.query.token;
    }

    if (!token) {
      return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecreto');

    // Lo que hayas guardado en el payload del JWT
    req.user = {
      id: decoded.id,
      role: decoded.role,
      email: decoded.email,
    };

    next();
  } catch (err) {
    console.error('ERROR AUTH JWT:', err.message);
    return res.status(401).json({ message: 'Token inválido' });
  }
};
