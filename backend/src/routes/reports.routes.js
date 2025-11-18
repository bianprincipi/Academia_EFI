// src/routes/reports.routes.js
const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');
const { Enrollment, Class, Subject, User } = require('../models');
const auth = require('../middlewares/auth');

router.get('/student-schedule/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { format } = req.query;

    if (req.user.role === 'estudiante' && req.user.id != id) {
      return res.status(403).json({ message: 'No autorizado' });
    }

    const enrollments = await Enrollment.findAll({
      where: { userId: id },
      include: [
        {
          model: Class,
          as: 'class',
          include: [
            { model: Subject, as: 'subject' },
            { model: User, as: 'teacher', attributes: ['id', 'name', 'email'] },
          ],
        },
      ],
      order: [['classId', 'ASC']],
    });

    const schedule = enrollments.map((enr) => {
      const clase = enr.class;
      const materia = clase?.subject;
      const prof = clase?.teacher;

      return {
        enrollmentId: enr.id,
        classId: clase?.id || null,
        subject: materia
          ? {
              id: materia.id,
              name: materia.name,
              description: materia.description,
            }
          : null,
        schedule: clase?.schedule || null,
        room: clase?.room || null,
        teacher: prof
          ? {
              id: prof.id,
              name: prof.name,
              email: prof.email,
            }
          : null,
      };
    });

    console.log('Enrollments encontrados:', enrollments.length);

    // Si no piden PDF => devolver JSON
    if (format !== 'pdf') {
      return res.json({
        studentId: id,
        count: schedule.length,
        schedule,
      });
    }

    // PDF
    const doc = new PDFDocument({ margin: 50 });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `inline; filename=cronograma-estudiante-${id}.pdf`
    );

    doc.pipe(res);

    doc.fontSize(18).text('Cronograma del estudiante', { align: 'center' });
    doc.moveDown();

    if (schedule.length === 0) {
      doc.fontSize(12).text('El estudiante no tiene inscripciones.');
    } else {
      schedule.forEach((item) => {
        const materia = item.subject;
        const prof = item.teacher;

        doc.fontSize(12).text(`Materia: ${materia ? materia.name : 'N/A'}`);
        doc.text(`Descripción: ${materia ? materia.description || '-' : '-'}`);
        doc.text(`Horario: ${item.schedule || '-'}`);
        doc.text(`Aula: ${item.room || '-'}`);
        doc.text(
          `Profesor: ${
            prof ? `${prof.name} (${prof.email || 'sin email'})` : '(sin datos)'
          }`
        );
        doc.moveDown();
      });
    }

    doc.end();
  } catch (err) {
    console.error('ERROR AL GENERAR REPORTE:', err);
    res.status(500).json({ message: 'Error al generar reporte' });
  }
});

module.exports = router;
