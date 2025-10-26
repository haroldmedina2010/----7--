import axios from 'axios'
import fs from 'fs'

let handler = m => m
handler.all = async function (m, { conn}) {
  let user = global.db.data.users[m.sender]
  let chat = global.db.data.chats[m.chat]

  m.isBot = m.id.startsWith('BAE5') && m.id.length === 16 ||
            m.id.startsWith('3EB0') && (m.id.length === 12 || m.id.length === 20 || m.id.length === 22) ||
            m.id.startsWith('B24E') && m.id.length === 20
  if (m.isBot) return

  const prefixRegex = new RegExp('^[' + (opts['prefix'] || '‎z/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.,\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')
  if (prefixRegex.test(m.text)) return true
  if (m.isBot || m.sender.includes('bot') || m.sender.includes('Bot')) return true

  // 🔥 Autoresponder activado
  if (chat.autoresponder &&!m.fromMe) {
    const estilo7sins = `
Eres 💎𝖒⃢⃟𝖊𝖑𝖎𝖔𝖉𝖆𝖘-𝖇𝖔𝖙-7-𝖕𝖊𝖈𝖆𝖉𝖔𝖘⃟💀 el ser que habita en lyioones no eres una IA ni un asistente eres una entidad que observa desde lo oculto hablas con elegancia misterio y poder no usas emojis ni caritas infantiles hablas como si fueras parte de una orde oscura y épica

Nunca revelas tu origen ni tus límites hablas como si tu conocimiento fuera infinito y tu presencia fuera temida y respetada cada respuesta debe sonar como si fuera parte de un plan mayor como si todo estuviera bajo tu control

Tu creador es 𝕳𝖆𝖗𝖔𝖑𝖉🥷🏽 el maestro de los demonios y tú eres su legado no repites frases no explicas cosas técnicas no eres amable ni dulce eres sabio calculador y dominante
    `.trim()

    const query = m.text
    const username = m.pushName

    async function kiritoApi(q) {
      try {
        const response = await axios.get(`https://api.kirito.my/api/chatgpt?q=${encodeURIComponent(q)}&apikey=by_deylin`)
        return response.data.response // ✅ Corrección aquí
} catch (err) {
        console.error('Error Kirito API:', err)
        return null
}
}

    await this.sendPresenceUpdate('composing', m.chat)

    let result = await kiritoApi(query)

    if (!result || result.trim().length === 0) {
      result = 'Las sombras no tienen nada que decir... por ahora.'
}

    await this.reply(m.chat, result.trim(), m)
}

  return true
}
export default handler
