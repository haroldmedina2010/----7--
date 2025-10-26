const linkRegex = /(chat\.whatsapp\.com\/[0-9A-Za-z]{20,24})|(z?https:\/\/whatsapp\.com\/channel\/[0-9A-Za-z]{20,24})/i
const allowedLinks = ['https://whatsapp.com/channel/0029VbBG4i2GE56rSgXsqw2W']

export async function before(m, { conn, isAdmin, isBotAdmin, isMods, isROwner, participants }) {
if (!m.isGroup) return
if (!m || !m.text) return
const chat = global?.db?.data?.chats[m.chat]
const isGroupLink = linkRegex.test(m.text)
const isChannelLink = /whatsapp\.com\/channel\//i.test(m.text)
const hasAllowedLink = allowedLinks.some(link => m.text.includes(link))
if (hasAllowedLink) return
if ((isGroupLink || isChannelLink) && !isAdmin) {
if (isBotAdmin) {
const linkThisGroup = `https://chat.whatsapp.com/${await conn.groupInviteCode(m.chat)}`
if (isGroupLink && m.text.includes(linkThisGroup)) return !0
}
if (chat.antilink && isGroupLink && !isAdmin && isBotAdmin && !isMods && m.key.participant !== conn.user.jid) {
await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.key.id, participant: m.key.participant }})
await conn.reply(m.chat, `> ⏤͟͟͞͞☆ Se ha eliminado a *${global.db.data.users[m.key.participant].name || 'Usuario'}* por mandar enlace, no permitimos enlaces de *${isChannelLink ? 'canales' : 'otros grupos'}*.`, null)
await conn.groupParticipantsUpdate(m.chat, [m.key.participant], 'remove')
}}}
