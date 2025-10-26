import moment from "moment-timezone"
import fs from "fs"
import path from "path"

let handler = async (m, { conn, usedPrefix}) => {
  try {
    let menu = {}
    for (let plugin of Object.values(global.plugins)) {
      if (!plugin ||!plugin.help) continue
      let taglist = plugin.tags || []
      for (let tag of taglist) {
        if (!menu[tag]) menu[tag] = []
        menu[tag].push(plugin)
}
}

    let uptimeSec = process.uptime()
    let hours = Math.floor(uptimeSec / 3600)
    let minutes = Math.floor((uptimeSec % 3600) / 60)
    let seconds = Math.floor(uptimeSec % 60)
    let uptimeStr = `${hours}h ${minutes}m ${seconds}s`
    let botNameToShow = global.botname || "💎𝖒⃢⃟𝖊𝖑𝖎𝖔𝖉𝖆𝖘-𝖇𝖔𝖙-7-𝖕𝖊𝖈𝖆𝖉𝖔𝖘⃟💀"
    let bannerUrl = global.michipg || "https://qu.ax/GYUbw.mp4" // Imagen grande
    let videoUrl = "https://adonixfiles.mywire.org/files/xzadonix_07.mp4"

    const senderBotNumber = conn.user.jid.split('@')[0]
    const configPath = path.join('./Sessions/SubBot', senderBotNumber, 'config.json')
    if (fs.existsSync(configPath)) {
      try {
        const subBotConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'))
        if (subBotConfig.name) botNameToShow = subBotConfig.name
        if (subBotConfig.banner) bannerUrl = subBotConfig.banner
        if (subBotConfig.video) videoUrl = subBotConfig.video
} catch (e) {
        console.error(e)
}
}

    let txt = `🎃 𝑴𝒖𝒚 𝒑𝒓𝒐𝒏𝒕𝒐 𝒆𝒏 𝑯𝒂𝒍𝒍𝒐𝒘𝒆𝒆𝒏, 𝒎𝒐𝒓𝒕𝒂𝒍𝒆𝒔...
𝐒𝐨𝐲 *${botNameToShow}*, 𝐞𝐥 𝐬𝐞𝐫 𝐞𝐧 𝐥𝐚𝐬 𝐬𝐨𝐦𝐛𝐫𝐚𝐬 ${(conn.user.jid == global.conn.user.jid? '(𝐏𝐫𝐢𝐧𝐜𝐢𝐩𝐚𝐥 🅥)': '(𝐒𝐮𝐛-𝐁𝐨𝐭 🅑)')}

🕒 *Hora:* ${moment.tz("America/Tegucigalpa").format("HH:mm:ss")}
📅 *Fecha:* ${moment.tz("America/Tegucigalpa").format("DD/MM/YYYY")}
⚙️ *Actividad:* ${uptimeStr}

🕸️ Canal de las sombras: https://whatsapp.com/channel/0029VbArz9fAO7RGy2915k3O

🦇 𝐄𝐬𝐭𝐨𝐬 𝐬𝐨𝐧 𝐥𝐨𝐬 𝐜𝐨𝐦𝐚𝐧𝐝𝐨𝐬 𝐝𝐞 𝐥𝐚 𝐨𝐬𝐜𝐮𝐫𝐢𝐝𝐚𝐝:\n\n`

    const halloweenEmojis = ['👹','😈','🎃','🧙🏻‍♀️','🧟','🧟‍♀️','🧛🏻','🧛🏻‍♀️','🦇','🕸️','🕷️','🧙🏻‍♂️','🧹']
    let emojiIndex = 0

    for (let tag in menu) {
      txt += `*» 🕷️ ${tag.toUpperCase()} 🕷️*\n`
      for (let plugin of menu[tag]) {
        for (let cmd of plugin.help) {
          let emoji = halloweenEmojis[emojiIndex % halloweenEmojis.length]
          txt += `> ${emoji} ${usedPrefix + cmd}\n`
          emojiIndex++
}
}
      txt += `\n`
}

    await conn.sendMessage(
      m.chat,
      {
        video: { url: videoUrl},
        caption: txt,
        gifPlayback: true,
        contextInfo: {
          isForwarded: true,
          forwardingScore: 999,
          externalAdReply: {
            title: '🕸️ 💎𝖒⃢⃟𝖊𝖑𝖎𝖔𝖉𝖆𝖘-𝖇𝖔𝖙-7-𝖕𝖊𝖈𝖆𝖉𝖔𝖘⃟💀- Mᴇɴᴜ́ ᴅᴇ ʟᴀ ᴏsᴄᴜʀɪᴅᴀᴅ 🦇',
            body: 'Explora los comandos disponibles',
            thumbnailUrl: bannerUrl, // Imagen grande arriba del video
            mediaType: 1,
            renderLargerThumbnail: true,
            sourceUrl: 'https://whatsapp.com/channel/0029VbArz9fAO7RGy2915k3O'
}
}
},
      { quoted: m}
)

} catch (e) {
    console.error(e)
    conn.reply(m.chat, "😈 Ocurrió un error😐...", m)
}
}

handler.command = ['help', 'menu']
export default handler
