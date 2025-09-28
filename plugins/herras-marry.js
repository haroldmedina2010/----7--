let proposals = {};
let marriages = {};

const handler = async (m, { conn, args, usedPrefix, command}) => {
  const userId = m.sender;
  const mentioned = m.mentionedJid[0];
  const input = args[0];

  const partnerId = mentioned || (input?.includes('@')? input.replace('@', '') + '@s.whatsapp.net': null);

  // 💔 DIVORCIO
  if (command === 'divorce' || command === 'divorciarse') {
    if (!marriages[userId]) {
      return conn.reply(
        m.chat,
        `💔 *No estás casado...*\n\nSi quieres casarte, usa:\n> *${usedPrefix}marry @usuario*\nEjemplo:\n> *${usedPrefix}marry @58242773183*`,
        m
);
}

    const ex = marriages[userId];
    delete marriages[userId];
    delete marriages[ex];

    return conn.reply(
      m.chat,
      `💔 *Divorcio realizado.*\n@${userId.split('@')[0]} y @${ex.split('@')[0]} ya no están casados.`,
      m,
      { mentions: [userId, ex]}
);
}

  // ✅ ACEPTAR PROPUESTA
  if (command === 'aceptar') {
    if (!partnerId) {
      return conn.reply(m.chat, `💌 *¿A quién estás aceptando?*\nUsa:\n> *${usedPrefix}aceptar @usuario*`, m);
}

    if (proposals[partnerId]!== userId) {
      return conn.reply(m.chat, '⚠️ *No tienes ninguna propuesta pendiente de esa persona.*', m);
}

    marriages[userId] = partnerId;
    marriages[partnerId] = userId;
    delete proposals[partnerId];
    delete proposals[userId];

    return conn.reply(
      m.chat,
      `💒 *¡Felicitaciones!*\n@${userId.split('@')[0]} y @${partnerId.split('@')[0]} ahora están oficialmente casados.`,
      m,
      { mentions: [userId, partnerId]}
);
}

  // 💍 MATRIMONIO (propuesta)
  if (command === 'marry' || command === 'casarse') {
    if (!partnerId) {
      return conn.reply(
        m.chat,
        `💍 *¿Con quién deseas casarte?*\n\n🔹 Usa el comando así:\n> *${usedPrefix}marry @usuario*\nEjemplo:\n> *${usedPrefix}marry @58242773183*`,
        m
);
}

    if (partnerId === userId) {
      return conn.reply(m.chat, '💔 *No puedes casarte contigo mismo.*', m);
}

    if (marriages[userId] || marriages[partnerId]) {
      return conn.reply(m.chat, '⚠️ *Uno de los dos ya está casado.*', m);
}

    // Confirmación mutua por doble.marry
    if (proposals[partnerId] === userId) {
      marriages[userId] = partnerId;
      marriages[partnerId] = userId;
      delete proposals[userId];
      delete proposals[partnerId];

      return conn.reply(
        m.chat,
        `💒 *¡Felicitaciones!*\n@${userId.split('@')[0]} y @${partnerId.split('@')[0]} ahora están oficialmente casados.`,
        m,
        { mentions: [userId, partnerId]}
);
}

    // Propuesta pendiente
    proposals[userId] = partnerId;

    conn.reply(
      m.chat,
      `💌 *Propuesta enviada a @${partnerId.split('@')[0]}*\nPuede aceptar con:\n> *${usedPrefix}marry @${userId.split('@')[0]}*\n> *${usedPrefix}aceptar @${userId.split('@')[0]}*\n⏳ Tienes 20 minutos para aceptar.`,
      m,
      { mentions: [partnerId]}
);

    // Cancelación automática
    setTimeout(() => {
      if (proposals[userId] === partnerId) {
        delete proposals[userId];
        conn.reply(
          m.chat,
          `⌛ *La propuesta entre @${userId.split('@')[0]} y @${partnerId.split('@')[0]} ha expirado.*`,
          null,
          { mentions: [userId, partnerId]}
);
}
}, 20 * 60 * 1000);
}
};

handler.command = ['marry', 'casarse', 'divorce', 'divorciarse', 'aceptar'];
handler.group = true;
export default handler;
