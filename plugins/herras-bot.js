// Estado global del bot
global.botActive = true;

const handler = async (m, { conn, command, isOwner}) => {
  // Protección: ignorar todo si el bot está apagado, excepto 'bot on'
  if (!global.botActive && m.text &&!m.text.toLowerCase().startsWith('bot on')) {
    return; // El bot está desactivado, no responde
}

  // Comando para encender/apagar el bot
  if (command === 'bot') {
    if (!isOwner) {
      return conn.reply(m.chat, '🚫 Solo el propietario puede controlar el estado del bot.', m);
}

    const arg = m.text.split(' ')[1]?.toLowerCase();

    if (arg === 'on') {
      global.botActive = true;
      return conn.reply(m.chat, '✅ *SHADOW-BOT ha sido ACTIVADO.*\nLas sombras se alzan nuevamente...', m);
} else if (arg === 'off') {
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
