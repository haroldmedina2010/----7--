global.botActive = true; // Estado inicial del bot

const handler = async (m, { conn, command, isOwner, isAdmin, isROwner}) => {
  const arg = m.text.split(' ')[1]?.toLowerCase();

  // Si el bot está apagado y el comando no es 'bot on'
  if (!global.botActive && command!== 'bot') {
    // Solo responde con advertencia si el mensaje viene de un grupo
    if (m.isGroup) {
      return conn.reply(
        m.chat,
        `⚠️ *SHADOW-BOT está actualmente DESACTIVADO.*\n\n🛠️ Solo un *administrador del grupo* puede reactivarlo usando:\n> *bot on*\n\n🕶️ Mientras tanto, permaneceré en silencio entre las sombras...`,
        m
);
} else {
      // En privado, no responde nada
      return;
}
}

  // Comando para encender/apagar el bot
  if (command === 'bot') {
    if (!m.isGroup &&!isOwner) {
      return conn.reply(m.chat, '🚫 Solo el propietario puede controlar el estado del bot en privado.', m);
}

    if (arg === 'on') {
      if (m.isGroup &&!isAdmin &&!isOwner) {
        return conn.reply(m.chat, '🚫 Solo un *administrador del grupo* puede activar el bot.', m);
}
      global.botActive = true;
      return conn.reply(m.chat, '✅ *SHADOW-BOT ha sido ACTIVADO.*\nLas sombras se alzan nuevamente...', m);
} else if (arg === 'off') {
      if (!isOwner &&!isROwner) {
        return conn.reply(m.chat, '🚫 Solo el *propietario del bot* puede apagarlo.', m);
}
      global.botActive = false;
      return conn.reply(m.chat, '🛑 *SHADOW-BOT ha sido DESACTIVADO.*\nMe retiro a las sombras...', m);
} else {
      return conn.reply(m.chat, '⚙️ Usa:\n> *bot on* – Para activar\n> *bot off* – Para desactivar', m);
}
}

  // Aquí puedes seguir con el resto de tus comandos normales...
};

handler.command = ['bot'];
handler.owner = true;

export default handler;
