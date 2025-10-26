import fetch from 'node-fetch';

let handler = async (m, { conn}) => {
  await m.react('😈');

  let username = await conn.getName(m.sender);

  // Lista de contactos estilo Meliodas Garden
  let list = [
    {
      displayName: " 💎𝖒⃢⃟𝖊𝖑𝖎𝖔𝖉𝖆𝖘 Creator ",
      vcard: `BEGIN:VCARD\nVERSION:3.0\nFN: Meliodas Master\nTEL;type=CELL;waid=574171514640:+57 317151-4640\nTEL;type=CELL;waid=573171514640:+57 317-1514640\nTEL;type=CELL;waid=+57 317 151 4640\nEND:VCARD`
}
  ];

  const canalInfo = {
    title: '⚔️👹 Canal Oficial de 💎𝖒⃢⃟𝖊𝖑𝖎𝖔𝖉𝖆𝖘⚔️👹',
    body: 'Sumérgete en el reyno de lyioness . Únete al canal oficial.',
    thumbnailUrl: 'https://qu.ax/QXPmz.jpg',
    sourceUrl: 'https://whatsapp.com/channel/0029VbArz9fAO7RGy2915k3O',
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
}, { quoted: m});

  // Mensaje decorado estilo The Eminence in Shadow
  let txt = ` 𝙄𝙉𝙁𝙊 𝘿𝙀𝙇 𝘾𝙍𝙀𝘼𝘿𝙊𝙍

> 👹𝖒⃢⃟𝖊𝖑𝖎𝖔𝖉𝖆𝖘-𝖇𝖔𝖙-7-𝖕𝖊𝖈𝖆𝖉𝖔𝖘⃟⚔️
> 😉 El estratega oculto tras las líneas del código

📡 𝗖𝗔𝗡𝗔𝗟 𝗢𝗙𝗜𝗖𝗜𝗔𝗟:
https://whatsapp.com/channel/0029VbArz9fAO7RGy2915k3O

📱 𝗖𝗢𝗡𝗧𝗔𝗖𝗧𝗢𝗦 𝗗𝗘 𝗟𝗔 𝗢𝗥𝗚𝗔𝗡𝗜𝗭𝗔𝗖𝗜𝗢́𝗡:
+57 3171514640
+57 3171514640
+57 3171514640

🧬 𝗖𝗢𝗗𝗘 𝗗𝗘 𝗔𝗖𝗖𝗘𝗦𝗢:
https://wa.me/+(785)3291589?text=.code

 *😈𝖒⃢⃟𝖊𝖑𝖎𝖔𝖉𝖆𝖘-𝖇𝖔𝖙-7-𝖕𝖊𝖈𝖆𝖉𝖔𝖘⃟⚔️* — El poder no se muestra... se oculta.`;

  // Enviar mensaje decorado con preview al final
  await conn.sendMessage(m.chat, {
    text: txt,
    contextInfo: {
      externalAdReply: canalInfo
}
}, { quoted: m});
};

handler.help = ['owner', 'creador'];
handler.tags = ['info'];
handler.command = /^(owner|creator|creador|dueño)$/i;

export default handler;
