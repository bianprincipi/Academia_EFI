function permit(...roles) {
  return (req, res, next) => {
    const role = req.user?.role;
    if (!role) return res.status(401).json({ message: 'No autenticado' });
    if (!roles.length || roles.includes(role)) return next();
    return res.status(403).json({ message: 'No autorizado' });
  };
}
module.exports = { permit };
