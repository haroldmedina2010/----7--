const handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin }) => {
  const primaryBot = global.db.data.chats[m.chat].primaryBot
  if (primaryBot && conn.user.jid !== primaryBot) throw !1

  const chat = global.db.data.chats[m.chat]
  const { antiLink, antiLinks, detect, welcome, modoadmin, nsfw, economy, gacha, antiprivado } = chat

  let type = command.toLowerCase()
  let isEnable = chat[type] !== undefined ? chat[type] : false

  switch (type) {
    case 'welcome': case 'bienvenida':
    case 'modoadmin': case 'onlyadmin':
    case 'detect': case 'alertas':
    case 'antilink': case 'antienlace':
    case 'antilinks': case 'antienlaces':
    case 'nsfw': case 'modohorny':
    case 'economy': case 'economia':
    case 'rpg': case 'gacha': {
      if (m.isGroup && !(isAdmin || isOwner)) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat[type] = isEnable
      break
    }

    case 'antiprivado': {
      if (!isOwner) {
        conn.reply(m.chat, '✘ Este comando solo puede ser usado por *dueños del bot*.', m)
        throw false
      }
      chat.antiprivado = isEnable
      break
    }

    default:
      return conn.reply(m.chat, `✘ Comando *${command}* no reconocido.`, m)
  }

  if (args[0] === 'on' || args[0] === 'enable') {
    if (isEnable) return conn.reply(m.chat, `✩ *${type}* ya estaba *activado*.`, m)
    isEnable = true
  } else if (args[0] === 'off' || args[0] === 'disable') {
    if (!isEnable) return conn.reply(m.chat, `✩ *${type}* ya estaba *desactivado*.`, m)
    isEnable = false
  } else {
    return conn.reply(m.chat, `〄 Puedes activar o desactivar el *${command}* con:\n\n❐ _Activar_ » *${usedPrefix}${command} enable*\n❐ _Desactivar_ » *${usedPrefix}${command} disable*\n\nꕥ Estado actual » *${isEnable ? '✓ Activado' : '✗ Desactivado'}*`, m)
  }

  chat[type] = isEnable
  conn.reply(m.chat, `> ➬ Has *${isEnable ? 'activado' : 'desactivado'}* *${type}* en este chat.`, m)
}

handler.help = ['welcome', 'modoadmin', 'nsfw', 'gacha', 'detect', 'antilink', 'economy', 'antiprivado']
handler.tags = ['nable']
handler.command = ['welcome', 'bienvenida', 'modoadmin', 'onlyadmin', 'nsfw', 'modohorny', 'economy', 'economia', 'rpg', 'gacha', 'detect', 'alertas', 'antilink', 'antienlace', 'antilinks', 'antienlaces', 'antiprivado']
handler.group = false // Ahora funciona en grupos y privados

export default handler
