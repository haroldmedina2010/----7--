// Variable global para controlar el estado del bot
global.botActive = true;

const handler = async (m, { conn, command, isOwner}) => {
  if (!isOwner) {
    return conn.reply(m.chat, '🚫 Solo el propietario puede usar este comando.', m);
}

  if (command === 'bot') {
    const arg = m.text.split(' ')[1]?.toLowerCase();

    if (arg === 'on') {
      global.botActive = true;
      return conn.reply(m.chat, '✅ *SHADOW-BOT ha sido ACTIVADO.*\nListo para operar desde las sombras.', m);
} else if (arg === 'off') {
      global.botActive = false;
      return conn.reply(m.chat, '🛑 *SHADOW-BOT ha sido DESACTIVADO.*\nMe retiro a las sombras...', m);
} else {
      return conn.reply(m.chat, '⚙️ Usa:\n> *bot on* – Para activar\n> *bot off* – Para desactivar', m);
}
}
};

handler.command = ['bot'];
handler.owner = true;

export default handler;
