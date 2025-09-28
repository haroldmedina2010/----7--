let proposals = {};
let marriages = {};

const handler = async (m, { conn, args, usedPrefix, command}) => {
  const userId = m.sender;
  const mentioned = m.mentionedJid[0];
  const input = args[0];

  // 💔 DIVORCIO
  if (command === 'divorce' || command === 'divorciarse') {
    if (!marriages[userId]) return conn.reply(m.chat, '💔 *No estás casado con nadie.*', m);
    const ex = marriages[userId];
    delete marriages[userId];
    delete marriages[ex];
    return conn.reply(m.chat, `💔 *Divorcio realizado.*\n@${userId.split('@')[0]} y @${ex.split('@')[0]} ya no están casados.`, m, {
      mentions: [userId, ex]
});
}

  // 💍 MATRIMONIO
  if (!input &&!mentioned) {
    return conn.reply(m.chat, `💍 *¿Con quién deseas casarte?*\n\n🔹 Usa el comando así:\n> *${usedPrefix}marry @usuario*`, m);
}

  const partnerId = mentioned || (input.includes('@')? input.replace('@', '') + '@s.whatsapp.net': null);
  if (!partnerId) return conn.reply(m.chat, '⚠️ *No se pudo identificar al usuario. Usa @ correctamente.*', m);

  if (partnerId === userId) return conn.reply(m.chat, '💔 *No puedes casarte contigo mismo.*', m);
  if (marriages[userId] || marriages[partnerId]) return conn.reply(m.chat, '⚠️ *Uno de los dos ya está casado.*', m);

  // Confirmación mutua
  if (proposals[partnerId] === userId) {
    marriages[userId] = partnerId;
    marriages[partnerId] = userId;
    delete proposals[userId];
    delete proposals[partnerId];
    return conn.reply(m.chat, `💒 *¡Felicitaciones!*\n@${userId.split('@')[0]} y @${partnerId.split('@')[0]} ahora están oficialmente casados.`, m, {
      mentions: [userId, partnerId]
});
}

  // Propuesta pendiente
  proposals[userId] = partnerId;
  conn.reply(m.chat, `💌 *Propuesta enviada a @${partnerId.split('@')[0]}*\nDebe responder con:\n> *${usedPrefix}marry @${userId.split('@')[0]}*\n⏳ Tienes 20 minutos para aceptar.`, m, {
    mentions: [partnerId]
});

  // Cancelación automática
  setTimeout(() => {
    if (proposals[userId] === partnerId) {
      delete proposals[userId];
      conn.reply(m.chat, `⌛ *La propuesta entre @${userId.split('@')[0]} y @${partnerId.split('@')[0]} ha expirado.*`, null, {
        mentions: [userId, partnerId]
});
}
}, 20 * 60 * 1000);
};

handler.command = ['marry', 'casarse', 'divorce', 'divorciarse'];
handler.group = true;
export default handler;
