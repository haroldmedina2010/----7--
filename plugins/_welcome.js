import fetch from 'node-fetch';

export async function before(m, { conn, participants, groupMetadata}) {
  if (!m.messageStubType ||!m.isGroup) return true;

  let vn = 'https://adonixfiles.mywire.org/files/xzadonix_26.mp3';
  let vn2 = 'https://adonixfiles.mywire.org/files/xzadonix_26.mp3';
  let chat = global.db.data.chats[m.chat];
  const getMentionedJid = () => {
    return m.messageStubParameters.map(param => `${param}@s.whatsapp.net`);
};

  let who = m.messageStubParameters[0] + '@s.whatsapp.net';
  let user = global.db.data.users[who];
  let userName = user? user.name: await conn.getName(who);

  const thumbnail = await (await fetch('https://files.catbox.moe/uak1qu.jpg')).buffer();
  const canalOficial = 'https://whatsapp.com/channel/0029VbArz9fAO7RGy2915k3O';

  if (chat.welcome && m.messageStubType === 27) {
    await conn.sendMessage(m.chat, {
      audio: { url: vn},
      mimetype: 'audio/mp4',
      ptt: false, // ← cambiado a false
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

  if (chat.welcome && (m.messageStubType === 28 || m.messageStubType === 32)) {
    await conn.sendMessage(m.chat, {
      audio: { url: vn2},
      mimetype: 'audio/mp4',
      ptt: false, // ← cambiado a false
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
