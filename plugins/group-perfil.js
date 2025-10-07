import PhoneNumber from 'awesome-phonenumber'
import fetch from 'node-fetch'

const imagen1 = 'https://files.catbox.moe/7sc3os.jpg'

var handler = async (m, { conn}) => {
  let who = m.mentionedJid?.[0] || m.quoted?.sender || m.sender

  let pp
  try {
    pp = await conn.profilePictureUrl(who, 'image')
} catch {
    pp = imagen1
}

  let user = global.db.data.users[who]
  if (!user) {
    global.db.data.users[who] = {
      premium: false,
      level: 0,
      cookies: 0,
      exp: 0,
      lastclaim: 0,
      registered: false,
      regTime: -1,
      age: 0,
      role: '⭑ Novato ⭑'
}
    user = global.db.data.users[who]
}

  let { premium, level, exp, registered, role} = user
  let username = await conn.getName(who)

  // Detectar si es el creador
  const creadorJID = '584242773183@s.whatsapp.net'
  const esCreador = who === creadorJID
  const esPremium = premium || esCreador

  // Frases estilo Shadow
  const frasesShadow = [
    'Quienes conocen sus sombras tienen más poder que quienes presumen su luz',
    'Las sombras te recuerdan que ellas librarán tu mayor potencial',
    'El poder se mide en silencio, no en palabras',
    'Yosue vigila desde el abismo, y tú formas parte de su legado',
    'Nuestro silencio no es debilidad, es estrategia',
    'Tu perfil ha sido analizado por la oscuridad',
    'Observa sus sus derrotas, llega a la cima desde las sombras',
    'Solo los dignos son reconocidos por el maestro de las sombras'
  ]
  const fraseElegida = frasesShadow[Math.floor(Math.random() * frasesShadow.length)]

  let animacion = `
〘 *Sistema de Sombras* 〙🕸️

🔍 Escaneando energía oculta...
⏳ Analizando grimorio del portador...
🕶️ Sincronizando con el núcleo sombrío...

✨✨✨ 𝙰𝙲𝚃𝙸𝚅𝙰𝙲𝙸𝙾́𝙽 𝙲𝙾𝙼𝙿𝙻𝙴𝚃𝙰 ✨✨✨

*El archivo de las sombras ha sido abierto...*
`.trim()

  await conn.sendMessage(m.chat, { text: animacion}, { quoted: m})

  let noprem = `
『 ＡＲＣＨ（ＩＶＯ ＳＯＭＢＲＡ ＢＡＳＥ 』📕

⚔️ *Portador:* ${username}
🆔 *Identificador:* @${who.replace(/@.+/, '')}
📜 *Registrado:* ${registered? '✅ Activado': '❌ No'}

🧪 *Estado de Energía:*
⚡ *Nivel:* ${level}
✨ *Experiencia:* ${exp}
📈 *Rango:* ${role}
🔮 *Premium:* ❌ No activo

📔 *Grimorio:* Básico de 1 hoja 📘
🔒 *Elemento:* Desconocido

🕶️ *Frase de las sombras:*
"${fraseElegida}"

━━━━━━━━━━━━━━━━━━
`.trim()

  let prem = `
👹〘 𝐌𝐎𝐃𝐎 𝐒𝐇𝐀𝐃𝐎𝐖: *𝐀𝐂𝐓𝐈𝐕𝐀𝐃𝐎* 〙👹

🌌 ＧＲＩＭＯＲＩＯ ５ＬＴ（Ａ）

🧛 *Portador Élite:* ${username}
🧿 *ID:* @${who.replace(/@.+/, '')}
✅ *Registrado:* ${registered? 'Sí': 'No'}
👑 *Rango:* 🟣 *Supremo de las Sombras*

🔮 *Energía Oscura:*
⚡ *Nivel:* ${level}
🌟 *Experiencia:* ${exp}
🪄 *Rango Mágico:* ${role}
💠 *Estado Premium:* ✅ ACTIVADO

📕 *Grimorio:* ☯️ Anti-Magia de 5 hojas
🔥 *Modo Especial:* ✦ *Despertar de las Sombras*
🧩 *Elemento:* Anti-Magia & Espada Abismal

📜 *Hechizo Desbloqueado:*
❖ 「𝙱𝚕𝚊𝚌𝚔 the Legends ⚡」
   ↳ Daño masivo a bots enemigos.

🕶️ *Frase de las sombras:*
"${fraseElegida}"

📔 *Nota:* Este usuario ha superado sus límites... ☄️

🌌⟣══════════════⟢🌌
`.trim()

  await conn.sendMessage(m.chat, {
    image: { url: pp},
    caption: esPremium? prem: noprem,
    mentions: [who]
}, { quoted: m})
}

handler.help = ['profile']
handler.register = true
handler.group = true
handler.tags = ['rg']
handler.command = ['profile', 'perfil']
export default handler
