import { createHash} from 'crypto';
import fetch from 'node-fetch';

const handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner}) => {
  let chat = global.db.data.chats[m.chat];
  let user = global.db.data.users[m.sender];
  let bot = global.db.data.settings[conn.user.jid] || {};
  let type = command.toLowerCase();
  let isAll = false, isUser = false;
  let isEnable = chat[type] || false;

  if (args[0] === 'on' || args[0] === 'enable') {
    isEnable = true;
} else if (args[0] === 'off' || args[0] === 'disable') {
    isEnable = false;
} else {
    const estado = isEnable? '✓ Activado': '✗ Desactivado';
    return conn.reply(m.chat, `🌟 *SHADOW-BOT CONTROL*\n━━━━━━━━━━━━━━━━━━━━\n*📜 Un administrador puede activar o desactivar el *${command}* utilizando:*\n\n> ✨ *${usedPrefix}${command} on* – Activar\n> ✨ *${usedPrefix}${command} off* – Desactivar\n\n━━━━━━━━━━━━━━━━━━━━\n🎭 *Estado actual* » *${estado}*`, m);
}

  switch (type) {
    case 'welcome':
    case 'bv':
    case 'bienvenida':
      if (!m.isGroup &&!isOwner) {
        global.dfail('group', m, conn);
        throw false;
} else if (m.isGroup &&!isAdmin) {
        global.dfail('admin', m, conn);
        throw false;
}
      chat.welcome = isEnable;
      break;

    case 'antiprivado':
    case 'antipriv':
    case 'antiprivate':
      isAll = true;
      if (!isOwner) {
        global.dfail('rowner', m, conn);
        throw false;
}
      bot.antiPrivate = isEnable;
      break;

    //... (los demás casos siguen igual, no se modifican)
}

  chat[type] = isEnable;

  conn.reply(
    m.chat,
    `👑 *SHADOW-BOT STATUS*\n━━━━━━━━━━━━━━━━━━━━\n👑 La función *${type}* se ha ${isEnable? '*ACTIVADO*': '*DESACTIVADO*'} ${isAll? 'para este Bot': isUser? 'para este usuario': 'para este chat'}\n━━━━━━━━━━━━━━━━━━━━`,
    m
);
};

handler.help = ['welcome', 'bv', 'bienvenida', 'antiprivado', 'antipriv', 'antiprivate', /*...otros comandos */];
handler.tags = ['nable'];
handler.command = ['welcome', 'bv', 'bienvenida', 'antiprivado', 'antipriv', 'antiprivate', /*...otros comandos */];

export default handler;
