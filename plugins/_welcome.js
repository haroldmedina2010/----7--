import fetch from 'node-fetch';

export async function before(m, { conn, groupMetadata}) {
  if (!m.messageStubType ||!m.isGroup) return true;

  const chat = global.db.data.chats[m.chat];
  const canalOficial = 'https://whatsapp.com/channel/0029VbArz9fAO7RGy2915k3O';
  const thumbnail = await (await fetch('https://files.catbox.moe/uak1qu.jpg')).buffer();
  const getMentionedJid = () => m.messageStubParameters.map(param => `${param}@s.whatsapp.net`);
  const who = m.messageStubParameters[0] + '@s.whatsapp.net';
  const userName = await conn.getName(who);

  // ✅ Usa tu audio subido a Catbox, Uguu, etc.
  const bienvenidaAudio = 'https://files.catbox.moe/u8cr1t.mp3';
  const despedidaAudio = 'https://files.catbox.moe/u8cr1t.mp3';

  // 🎉 Bienvenida
  if (chat.welcome && m.messageStubType === 27) {
    await conn.sendMessage(m.chat, {
      audio: { url: bienvenidaAudio},
      mimetype: 'audio/mp4', // usa audio/mp4 para mayor compatibilidad
      ptt: true,
      fileName: 'bienvenida.mp3',
      contextInfo: {
        mentionedJid: getMentionedJid(),
        externalAdReply: {
          title: `✨ Bienvenido/a ${userName} ✨`,
          body: `¡Nos alegra tenerte aquí en *${groupMetadata.subject}*!`,
          previewType: 'PHOTO',
          thumbnail,
          sourceUrl: canalOficial,
          showAdAttribution: true
}
}
}, { quoted: m});
}

  // 👋 Despedida
  if (chat.welcome && (m.messageStubType === 28 || m.messageStubType === 32)) {
    await conn.sendMessage(m.chat, {
      audio: { url: despedidaAudio},
      mimetype: 'audio/mp4',
      ptt: true,
      fileName: 'despedida.mp3',
      contextInfo: {
        mentionedJid: getMentionedJid(),
        externalAdReply: {
          title: `❀ Adiós ${userName} ❀`,
          body: `Esperamos verte de nuevo por *${groupMetadata.subject}*`,
          previewType: 'PHOTO',
          thumbnail,
          sourceUrl: canalOficial,
          showAdAttribution: true
}
}
}, { quoted: m});
}
        }
