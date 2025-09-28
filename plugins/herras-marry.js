import fetch from 'node-fetch';

let marriages = {}; // 💾 Base de datos temporal de matrimonios

const handler = async (m, { conn, args}) => {
    const userId = m.sender;

    // 📝 Validación de argumento
    if (!args[0]) {
        return conn.reply(
            m.chat,
            `💍 *¿Con quién deseas casarte?*\n\n🔹 Usa el comando seguido del usuario:\n> *${usedPrefix}marry @usuario*`,
            m
);
}

    // 🧠 Procesar ID del compañero
    const partnerId = args[0].replace('@', '') + '@s.whatsapp.net';

    // ❌ No puedes casarte contigo mismo
    if (partnerId === userId) {
        return conn.reply(m.chat, '💔 *No puedes casarte contigo mismo. Busca a alguien más...*', m);
}

    // 🔐 Verificar si ya están casados
    if (marriages[userId] || marriages[partnerId]) {
        return conn.reply(m.chat, '⚠️ *Uno de los dos ya está casado. No se permiten triángulos amorosos.*', m);
}

    // 💾 Registrar matrimonio
    marriages[userId] = partnerId;
    marriages[partnerId] = userId;

    // 🎉 Mensaje de celebración
    const userTag = '@' + userId.split('@')[0];
    const partnerTag = '@' + partnerId.split('@')[0];

    conn.reply(
        m.chat,
        `💒 *¡Felicitaciones!*\n${userTag} y ${partnerTag} ahora están oficialmente casados.\n\n🎊 Que las sombras bendigan esta unión.`,
        m,
        { mentions: [userId, partnerId]}
);
};

handler.command = ['marry', 'casarse'];
export default handler;
