const { User, PasswordReset } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { v4: uuid } = require('uuid');
const sgMail = require('@sendgrid/mail');

const hasSG = process.env.SENDGRID_API_KEY && process.env.SENDGRID_API_KEY.startsWith('SG.');
if (hasSG) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
} else {
  console.warn('SendGrid no configurado (SENDGRID_API_KEY ausente o inválida). Se omitirá el envío de correo.');
}

exports.login = async (req,res)=>{
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email }});
  if(!user) return res.status(401).json({ message:'Credenciales inválidas' });
  const ok = await bcrypt.compare(password, user.password);
  if(!ok) return res.status(401).json({ message:'Credenciales inválidas' });
  const token = jwt.sign({ id:user.id, role:user.role }, process.env.JWT_SECRET, { expiresIn:'8h' });
  res.json({ token, user:{ id:user.id, name:user.name, email:user.email, role:user.role } });
};

exports.forgotPassword = async (req,res)=>{
  const { email } = req.body;
  const user = await User.findOne({ where:{ email }});
  if(!user) return res.json({ message:'Si el correo existe, enviaremos instrucciones' });

  const token = uuid();
  const expiresAt = new Date(Date.now() + 1000*60*30); // 30 min
  await require('../models').PasswordReset.create({ userId:user.id, token, expiresAt, used:false });

  const resetLink = `${process.env.PUBLIC_FRONT_URL || 'http://localhost:5173'}/reset-password?token=${token}`;
  const msg = {
    to: email,
    from: process.env.SENDGRID_FROM || 'no-reply@example.com',
    subject: 'Restablecer contraseña',
    text: `Usa este enlace para restablecer tu contraseña: ${resetLink}`,
    html: `<p>Usa este enlace para restablecer tu contraseña:</p><p><a href="${resetLink}">${resetLink}</a></p>`,
  };

  if (hasSG) {
    try { await sgMail.send(msg); }
    catch (e) { console.error('SendGrid error:', e?.response?.body || e.message); }
  } else {
    console.log('[DEBUG] Enlace de reset (sin enviar correo):', resetLink);
  }

  res.json({ message:'Si el correo existe, enviaremos instrucciones' });
};

exports.resetPassword = async (req,res)=>{
  const { token, newPassword } = req.body;
  const { PasswordReset } = require('../models');
  const pr = await PasswordReset.findOne({ where:{ token }});
  if(!pr || pr.used) return res.status(400).json({ message:'Token inválido' });
  if(pr.expiresAt < new Date()) return res.status(400).json({ message:'Token expirado' });

  const user = await require('../models').User.findByPk(pr.userId);
  const hash = await bcrypt.hash(newPassword, 10);
  await user.update({ password: hash });
  await pr.update({ used:true });

  res.json({ message:'Contraseña actualizada' });
};
