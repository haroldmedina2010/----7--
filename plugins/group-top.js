import util from 'util';
import path from 'path';

let user = a => '@' + a.split('@')[0];

function handler(m, { groupMetadata, command, conn, text, usedPrefix}) {
  let ps = groupMetadata.participants.map(v => v.id);
  let a = ps.getRandom(), b = ps.getRandom(), c = ps.getRandom(), d = ps.getRandom(), e = ps.getRandom();
  let f = ps.getRandom(), g = ps.getRandom(), h = ps.getRandom(), i = ps.getRandom(), j = ps.getRandom();

  let emoji = pickRandom(['🤓','😅','😂','😳','😎','🥵','😱','🤑','🙄','💩','🍑','🤨','🥴','🔥','👇🏻','😔','👀','🌚']);
  let estilo = pickRandom(['𝚃𝙾𝙿 𝟷𝟶', 'ＴＯＰ １０', '🧠 𝙏𝙊𝙋 𝙏𝙀𝙉', '👑 Top 10', '💥 𝑻𝒐𝒑 𝟏𝟎']);
  let iconos = ['🥇','🥈','🥉','🎯','🎲','🎮','🎤','🎧','📱','🧠'];

  if (!text) {
    return conn.reply(m.chat, `❗ *Uso correcto del comando:*\n\n${usedPrefix}top *<tema>*\n\n📌 Ejemplo:\n${usedPrefix}top más tóxicos del grupo`, m);
}

  let top = `╭━━━〔 ${emoji} ${estilo} ${text.toUpperCase()} ${emoji} 〕━━━╮\n\n` +
            `${iconos[0]} 1. ${user(a)}\n` +
            `${iconos[1]} 2. ${user(b)}\n` +
            `${iconos[2]} 3. ${user(c)}\n` +
            `${iconos[3]} 4. ${user(d)}\n` +
            `${iconos[4]} 5. ${user(e)}\n` +
            `${iconos[5]} 6. ${user(f)}\n` +
            `${iconos[6]} 7. ${user(g)}\n` +
            `${iconos[7]} 8. ${user(h)}\n` +
            `${iconos[8]} 9. ${user(i)}\n` +
            `${iconos[9]} 10. ${user(j)}\n\n` +
            `╰━━━━━━━━━━━━━━━━━━━━━━━╯`;

  conn.reply(m.chat, top, m, { mentions: [a, b, c, d, e, f, g, h, i, j]});
}

handler.help = ['top *<tema>*'];
handler.tags = ['fun'];
handler.command = ['top'];
handler.group = true;
handler.register = true;

export default handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
                           }
