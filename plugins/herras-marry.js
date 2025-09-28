let proposals = {};   // 💌 Propuestas pendientes
let marriages = {};   // 💍 Matrimonios confirmados

const handler = async (m, { conn, args, usedPrefix, command}) => {
  const userId = m.sender;
  const mentioned = m.mentionedJid[0];

  // 💔 DIVORCIO
  if (command === 'divorce' || command === 'divorciarse') {
    if (!marriages[userId]) {
      return conn.reply(m.chat, '💔 *No estás casado con nadie.*', m);
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

  // 💍 MATRIMONIO
  if (!mentioned) {
    return conn.reply(
      m.chat,
      `💍 *¿Con quién deseas casarte?*\n\n🔹 Usa el comando así:\n> *${usedPrefix}marry @usuario*`,
      m
);
}

  const partnerId = mentioned;

  if (partnerId === userId) {
    return conn.reply(m.chat, '💔 *No puedes casarte contigo mismo.*', m);
}

  if (marriages[userId] || marriages[partnerId]) {
    return conn.reply(m.chat, '⚠️ *Uno de los dos ya está casado.*', m);
}

  // 💌 Si el otro ya propuso antes, se confirma el matrimonio
  if (proposals[partnerId] === userId) {
    marriages[userId] = partnerId;
    marriages[partnerId] = userId;
    delete proposals[userId];
    delete proposals[partnerId];

    return conn.reply(
      m.chat,
      `💒 *¡Felicitaciones!*\n@${userId.split('@')[0]} y @${partnerId.split('@')[0]} ahora están oficialmente casados.\n\n🎊 Que las sombras bendigan esta unión.`,
      m,
      { mentions: [userId, partnerId]}
);
}

  // 💌 Registrar propuesta y esperar confirmación
  proposals[userId] = partnerId;

  conn.reply(
    m.chat,
    `💌 *Propuesta enviada a @${partnerId.split('@')[0]}*\nDebe responder con:\n> *${usedPrefix}marry @${userId.split('@')[0]}*\n\n⏳ Tienes 20 minutos para aceptar o se cancelará.`,
    m,
    { mentions: [partnerId]}
);

  // ⏳ Cancelar si no responde en 20 minutos
  setTimeout(() => {
    if (proposals[userId] === partnerId) {
      delete proposals[userId];
      conn.reply(
        m.chat,
        `⌛ *La propuesta de matrimonio entre @${userId.split('@')[0]} y @${partnerId.split('@')[0]} ha expirado.*`,
        null,
        { mentions: [userId, partnerId]}
);
}
}, 20 * 60 * 1000); // 20 minutos
};

handler.command = ['marry', 'casarse', 'divorce', 'divorciarse'];
handler.group = true;
export default handler;
