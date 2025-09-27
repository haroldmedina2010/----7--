export async function before(m, { conn, isAdmin, isBotAdmin, isOwner, isROwner}) {
  if (m.isBaileys && m.fromMe) return true;
  if (m.isGroup) return false;
  if (!m.message) return true;

  const chat = global.db.data.chats[m.chat];
  const bot = global.db.data.settings[conn.user.jid] || {};

  // Lista de palabras clave a detectar
  const palabrasClave = ['PIEDRA', 'PAPEL', 'TIJERA', 'serbot', 'jadibot'];

  if (palabrasClave.some((palabra) => m.text.includes(palabra))) return true;
  if (m.chat === '120363416409380841@newsletter') return true;

  // Bloqueo de chats privados si la opción está activada
  if (bot.antiPrivate &&!isOwner &&!isROwner) {
    const grupoURL = 'https://chat.whatsapp.com/If3WAOMJqZp2WLqDp9n4Cw?mode=ems_copy_t'; // ← nuevo enlace de grupo
    const nombreUsuario = await conn.getName(m.sender); // obtiene el nombre del que escribió
    const mensajeBloqueo = `⚠️ *Hola ${nombreUsuario}*, mi creador ha desactivado los comandos en chats privados.\n\nPor lo tanto, serás bloqueado automáticamente.\n\n🌌 *Únete al grupo oficial para usar el bot:*\n${grupoURL}`;
    const imagenURL = 'https://adonixfiles.mywire.org/files/xzadonix_07.jpg'; // URL de la imagen

    // Enviar la imagen junto con el mensaje de bloqueo
    await conn.sendFile(m.chat, imagenURL, 'antiprivado.jpg', mensajeBloqueo, m, false, { mentions: [m.sender]});

    // Bloquear al usuario
    await conn.updateBlockStatus(m.chat, 'block');
}

  return false;
}
