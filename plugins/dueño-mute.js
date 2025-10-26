import fetch from 'node-fetch';

const handler = async (m, { conn, command, text, isOwner}) => {
    const userId = m.mentionedJid && m.mentionedJid[0]
? m.mentionedJid[0]
: m.quoted
? m.quoted.sender
: text;

    if (!isOwner) throw '⚔️ *Solo el verdadero maestro de las sombras puede ejecutar este comando.*';
    if (!userId) throw '👻 *Debes mencionar al objetivo que será silenciado o liberado.*';

    const user = global.db.data.users[userId] || {};
    user.mute = user.mute || false;

    if (command === 'mute') {
        if (user.mute) throw '⚠️ *Ese alma ya ha sido silenciada por los 10 mandamientos.*';
        user.mute = true;
        await conn.reply(m.chat, '🔇 *El usuario ha sido silenciado. Sus palabras serán borradas por el reyno demoniaco.*', m);
}

    if (command === 'unmute') {
        if (!user.mute) throw '⚠️ *Ese alma ya está libre de la maldición.*';
        user.mute = false;
        await conn.reply(m.chat, '🔊 *El usuario ha sido liberado. Puede hablar nuevamente bajo la vigilancia de Shadow.*', m);
}

    global.db.data.users[userId] = user;
};

// 🧹 Elimina los mensajes de los usuarios silenciados
handler.before = async (m, { conn}) => {
    const sender = m.sender;
    const isMuted = global.db.data.users[sender]?.mute;

    if (isMuted &&!m.key.fromMe) {
        try {
            await conn.sendMessage(m.chat, { delete: m.key});
} catch (e) {
            console.error('❌ Error al eliminar mensaje:', e);
}
}
};

handler.command = ['mute', 'unmute'];
handler.rowner = true; // ← Solo el owner puede usarlo

export default handler;
