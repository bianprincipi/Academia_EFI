// routes/reports.routes.js
const express = require('express');
const PDFDocument = require('pdfkit');
const router = express.Router();
const auth = require('../middlewares/auth');
const { Enrollment, Class, Subject, User } = require('../models');

// GET /reports/student-schedule/:id_usuario
router.get('/student-schedule/:id_usuario', auth, async (req, res) => {
  try {
    const { id_usuario } = req.params;

    // Solo admin o el mismo estudiante
    if (req.user.role !== 'admin' && Number(id_usuario) !== req.user.id) {
      return res.status(403).json({ message: 'No puedes ver el horario de otro estudiante' });
    }

    const enrollments = await Enrollment.findAll({
      where: { id_usuario },
      include: [
        {
          model: Class,
          as: 'class',
          include: [
            { model: Subject, as: 'subject' },
            { model: User, as: 'professor', attributes: ['name', 'email'] },
          ],
        },
      ],
    });

    // Cabeceras de respuesta
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="horario_estudiante_${id_usuario}.pdf"`
    );

    const doc = new PDFDocument();
    doc.pipe(res);

    doc.fontSize(18).text('Horario del Estudiante', { align: 'center' });
    doc.moveDown();

    enrollments.forEach((enr) => {
      const c = enr.class;
      doc
        .fontSize(12)
        .text(`Asignatura: ${c?.subject?.name || 'N/A'}`)
        .text(`Profesor: ${c?.professor?.name || 'N/A'} (${c?.professor?.email || ''})`)
        .text(`Horario: ${c?.horario || ''}`)
        .text(`Salón: ${c?.salon || ''}`)
        .moveDown();
    });

    doc.end();
  } catch (err) {
    console.error(err);
    // OJO: no podés mandar JSON después de empezar el PDF, así que esto es por si falla antes
    if (!res.headersSent) {
      res.status(500).json({ message: 'Error al generar PDF' });
    }
  }
});

module.exports = router;
