import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
  await m.react('👑');

  let username = await conn.getName(m.sender);

  // Lista con único contacto
  let list = [
    {
      displayName: "💎𝖒⃢⃟𝖊𝖑𝖎𝖔𝖉𝖆𝖘-𝖇𝖔𝖙-7-𝖕𝖊𝖈𝖆𝖉𝖔𝖘⃟💀",
      vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:𓆩‌۫᷼ ִֶָღܾ݉͢𝐇ꪖ𝐫o͟𝐥𝐝𓆪 MD\nTEL;type=CELL;waid=573171514640:+57 317 1514640\nEND:VCARD`
    }
  ];

  const canalInfo = {
    title: 'Ver canal oficial 🖤',
    body: 'Haz clic para acceder al canal del bot',
    thumbnailUrl: 'https://qu.ax/SUjrf.jpg',
    sourceUrl: 'https://whatsapp.com/channel/0029VbBG4i2GE56rSgXsqw2W',
    mediaType: 1,
    renderLargerThumbnail: true
  };

  // Enviar contacto con preview
  await conn.sendMessage(m.chat, {
    contacts: {
      displayName: `${list.length} Contacto`,
      contacts: list
    },
    contextInfo: {
      externalAdReply: canalInfo
    }
  }, { quoted: m });

  // Mensaje decorado personalizado
  let txt = `🖤ＡＱＵ（́  ɛֆȶǟ́ ꒒ꂦꑄ 𝘿𝘼𝙏𝙊𝙎 ∂є ᴍɪ ᑕᖇᗴᗩᗪOᖇ🏐  
> Ⴆყ 𓆩‌۫᷼ ִֶָღܾ݉͢𝐇ꪖ𝐫o͟𝐥𝐝𓆪 𝐌𝐃

🖤ᏞᏆΝᏦ𝐒🔗🪀

🖤𝐓𝐈𝐊 𝐓𝐎𝐊📹: https://tiktok.com/@ladobleaa2010

🪀😍𝐂𝐀𝐍𝐀𝐋 𝐃𝐄Ꮮ🏐 💎𝖒⃢⃟𝖊𝖑𝖎𝖔𝖉𝖆𝖘-𝖇𝖔𝖙-7-𝖕𝖊𝖈𝖆𝖉𝖔𝖘⃟💀 🖤: https://whatsapp.com/channel/0029VbBG4i2GE56rSgXsqw2W

🖤NÚMERO ÐÈ ᘻᓰ ᑕᖇᗴᗩᗪᓍᖇ: +57 317 1514640 ☟
https://WA.me/573171514640?text=

🏐#️⃣𐒐Ꮼ́𐒄ᏋᏒ𐒀 DEL 𝗕𝗢𝗧🤖🖤:
https://WA.me/17853291589?text=.code`;

  // Enviar mensaje decorado con preview al final
  await conn.sendMessage(m.chat, {
    text: txt,
    contextInfo: {
      externalAdReply: canalInfo
    }
  }, { quoted: m });
};

handler.help = ['owner', 'creador'];
handler.tags = ['info'];
handler.command = /^(owner|creator|creador|dueño)$/i;

export default handler;
