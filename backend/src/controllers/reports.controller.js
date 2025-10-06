const PDFDocument = require('pdfkit');
const { Enrollment, Class, Subject, User } = require('../models');

exports.studentSchedule = async (req, res)=>{
  const { userId } = req.params;
  const data = await Enrollment.findAll({
    where:{ userId },
    include:[
      { model: Class, include:[ { model: Subject, attributes:['name'] }, { model: User, as:'teacher', attributes:['name','email'] } ] }
    ]
  });
  const doc = new PDFDocument();
  res.setHeader('Content-Type','application/pdf');
  res.setHeader('Content-Disposition','inline; filename="horario.pdf"');
  doc.pipe(res);
  doc.fontSize(18).text('Horario del Estudiante', { underline:true });
  doc.moveDown();
  data.forEach(e=>{
    doc.fontSize(12).text(`Clase #${e.class.id} - ${e.class.subject.name}`);
    doc.text(`Docente: ${e.class.teacher.name} (${e.class.teacher.email})`);
    doc.text(`Horario: ${e.class.schedule} - Aula: ${e.class.room}`);
    doc.moveDown();
  });
  doc.end();
};

exports.classRoster = async (req, res)=>{
  const { classId } = req.params;
  const data = await Enrollment.findAll({
    where:{ classId },
    include:[ { model: User, attributes:['name','email'] } ]
  });
  const doc = new PDFDocument();
  res.setHeader('Content-Type','application/pdf');
  res.setHeader('Content-Disposition','inline; filename="inscriptos.pdf"');
  doc.pipe(res);
  doc.fontSize(18).text(`Listado de inscriptos - Clase #${classId}`, { underline:true });
  doc.moveDown();
  data.forEach((e,i)=>{
    doc.fontSize(12).text(`${i+1}. ${e.User.name} - ${e.User.email}`);
  });
  doc.end();
};
