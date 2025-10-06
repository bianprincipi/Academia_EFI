const { Enrollment, Class, Subject, User } = require('../models');

exports.create = async (req, res) => {
  const { userId, classId } = req.body || {};
  if (!userId || !classId) return res.status(400).json({ message: 'userId y classId requeridos' });

  // Si es estudiante, solo puede inscribirse a sí mismo
  if (req.user?.role === 'estudiante' && req.user.id !== Number(userId)) {
    return res.status(403).json({ message: 'No autorizado' });
  }

  try {
    const exists = await Enrollment.findOne({ where: { userId, classId } });
    if (exists) return res.status(409).json({ message: 'Ya estás inscripto/a a esta clase' });

    const row = await Enrollment.create({ userId, classId, enrolledAt: new Date() });
    return res.status(201).json(row);
  } catch (e) {
    return res.status(500).json({ message: 'Error al inscribir' });
  }
};

exports.byUser = async (req, res) => {
  const { userId } = req.params;
  // Si es estudiante, solo puede ver lo suyo (o admin todo)
  if (req.user?.role === 'estudiante' && req.user.id !== Number(userId)) {
    return res.status(403).json({ message: 'No autorizado' });
  }

  const rows = await Enrollment.findAll({
    where: { userId },
    include: [
      { model: Class, include: [
        { model: Subject, attributes:['id','name'] },
        { model: User, as: 'teacher', attributes:['id','name','email'] }
      ]}
    ]
  });
  res.json(rows);
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  const row = await Enrollment.findByPk(id);
  if (!row) return res.status(404).json({ message:'No encontrado' });

  // Si es estudiante, solo puede darse de baja de sus inscripciones
  if (req.user?.role === 'estudiante' && req.user.id !== row.userId) {
    return res.status(403).json({ message: 'No autorizado' });
  }

  await row.destroy();
  res.json({ ok: true });
};
