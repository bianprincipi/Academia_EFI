const jwt = require('jsonwebtoken');
function auth(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const [, token] = header.split(' '); // "Bearer <token>"
    if (!token) return res.status(401).json({ message: 'Token requerido' });
    req.user = jwt.verify(token, process.env.JWT_SECRET); // { id, role }
    next();
  } catch {
    return res.status(401).json({ message: 'Token inválido' });
  }
}
module.exports = { auth };
