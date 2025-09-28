import { areJidsSameUser} from '@whiskeysockets/baileys'

export async function before(m, { participants, conn}) {
    if (m.isGroup) {
        let chat = global.db.data.chats[m.chat];

        if (!chat.antiBot2) return;

        let botJid = global.conn.user.jid; // JID del bot principal

        if (botJid === conn.user.jid) return;

        let isBotPresent = participants.some(p => areJidsSameUser(botJid, p.id));

        if (isBotPresent) {
            setTimeout(async () => {
                await conn.reply(m.chat,
`╭━━〔 🌌 𝐒𝐇𝐀𝐃𝐎𝐖-𝐁𝐎𝐓 🌌 〕━━╮
┃ He detectado la presencia del bot principal.
┃ Como miembro de las sombras, me retiro silenciosamente...
┃ Para evitar conflictos innecesarios.
╰━━━━━━━━━━━━━━━━━━━━━━╯`, m, fake);
                await this.groupLeave(m.chat);
}, 5000); // 5 segundos
}
}
              }
