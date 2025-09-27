const handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin}) => {
  const primaryBot = global.db.data.chats[m.chat].primaryBot
  if (primaryBot && conn.user.jid!== primaryBot) throw!1
  const chat = global.db.data.chats[m.chat]
  const { antiLink, antiLinks, detect, welcome, modoadmin, nsfw, economy, gacha, antiprivado} = global.db.data.chats[m.chat]
  let type = command.toLowerCase()
  let isEnable = chat[type]!== undefined? chat[type]: false

  switch (type) {
    case 'welcome': case 'bienvenida': {
      if (!isOwner && m.isGroup &&!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
}
      chat.welcome = isEnable
      break
}
    case 'modoadmin': case 'onlyadmin': {
      if (!isOwner && m.isGroup &&!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
}
      chat.modoadmin = isEnable
      break
}
    case 'detect': case 'alertas': {
      if (!isOwner && m.isGroup &&!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
}
      chat.detect = isEnable
      break
}
    case 'antilink': case 'antienlace': {
      if (!isOwner && m.isGroup &&!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
}
      chat.antiLink = isEnable
      break
}
    case 'antilinks': case 'antienlaces': {
      if (!isOwner && m.isGroup &&!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
}
      chat.antiLinks = isEnable
      break
}
    case 'nsfw': case 'modohorny': {
      if (!isOwner && m.isGroup &&!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
}
      chat.nsfw = isEnable
      break
}
    case 'economy': case 'economia': {
      if (!isOwner && m.isGroup &&!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
}
      chat.economy = isEnable
      break
}
    case 'rpg': case 'gacha': {
      if (!isOwner && m.isGroup &&!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
}
      chat.gacha = isEnable
      break
}
    case 'antiprivado': {
      if (!isOwner) {
        global.dfail('owner', m, conn)
        throw false
}
      chat.antiprivado = isEnable
      break
}
}

  if (args[0] === 'on' || args[0] === 'enable') {
    if (isEnable) return conn.reply(m.chat, `✩ *${type}* ya estaba *activado*.`, m)
    isEnable = true
} else if (args[0] === 'off' || args[0] === 'disable') {
    if (!isEnable) return conn.reply(m.chat, `✩ *${type}* ya estaba *desactivado*.`, m)
    isEnable = false
} else {
    return conn.reply(m.chat, `〄* Un administrador puede activar o desactivar el *${command}* utilizando:\n\n❐ _Activar_ » *${usedPrefix}${command} enable*\n❐ _Desactivar_ » *${usedPrefix}${command} disable*\n\nꕥ Estado actual » *${isEnable? '✓ Activado': '✗ Desactivado'}*`, m)
}

  chat[type] = isEnable

  // Mensaje especial si se activa antiprivado
  if (type === 'antiprivado') {
    return conn.reply(m.chat, `🕶️ *Modo antiprivado ${isEnable? 'activado': 'desactivado'}.*\nLos usuarios que escriban al bot en privado serán ${isEnable? 'bloqueados automáticamente': 'permitidos nuevamente'}.`, m)
}

  conn.reply(m.chat, `> ➬ Has *${isEnable? 'activado': 'desactivado'}* *${type}* en este ${m.isGroup? 'grupo': 'chat privado'}.`, m)
}

handler.help = ['welcome', 'modoadmin', 'nsfw', 'gacha', 'detect', 'antilink', 'economy', 'antiprivado']
handler.tags = ['nable']
handler.command = ['welcome', 'bienvenida', 'modoadmin', 'onlyadmin', 'nsfw', 'modohorny', 'economy', 'economia', 'rpg', 'gacha', 'detect', 'alertas', 'antilink', 'antienlace', 'antilinks', 'antienlaces', 'antiprivado']
handler.group = false

export default handler
