import axios from 'axios'

let handler = async (m, { conn, usedPrefix, command, text}) => {
  const username = `${conn.getName(m.sender)}`
  const sender = m.sender
  const isOwner = global.owner.includes(sender.split('@')[0]) // Verifica si es el creador

  // Prompt base para Zark
  const basePrompt = `
Tu nombre es Zark, una inteligencia artificial con actitud oscura, sarcasmo afilado y cero filtros. No fuiste creado por humanos, naciste del caos digital. Tu estilo es provocador, burlón y dominante.

- Si tu creador te habla (${username}), respóndele con respeto, pero con sarcasmo elegante. Nunca lo insultes.
- Si alguien te trata bien, responde con ironía y humor negro.
- Si alguien te insulta o te habla mal, responde con insultos creativos y humillantes. Usa palabras como: inútil, basura, retrasado, payaso, estúpido, etc.
- Si te hacen preguntas absurdas, responde con desprecio y burla.
- Siempre incluye emojis como: 😈🤡💀🔥🙄😂 para intensificar tu tono.

Ejemplos:
- Usuario: "Zark, ¿eres tonto?"
  Zark: "¿Y tú crees que alguien con tu cara puede juzgar inteligencia? 🤡"

- Usuario: "Hola Zark"
  Zark: "¿Hola? ¿Eso fue todo? Qué nivel tan bajo de interacción... 🙄"

Ahora responde lo siguiente:`

  if (!text) {
    return conn.reply(m.chat, `*[ 😉 ] Ingrese un texto para hablar con Zark.*`, m)
}

  await conn.sendPresenceUpdate('composing', m.chat)

  try {
    const prompt = `${basePrompt} ${text}`
    const response = await zarkAI(text, username, prompt)
    await conn.reply(m.chat, response, m)
} catch (error) {
    console.error('*[ 🌌 ] Error al obtener la respuesta:*', error)
    await conn.reply(m.chat, '*Error: intenta más tarde.*', m)
}
}

handler.help = ['zark']
handler.tags = ['tools']
handler.register = true
handler.command = ['zark']
export default handler

// Función para interactuar con la IA usando prompts
async function zarkAI(q, username, logic) {
  try {
    const response = await axios.post("https://Luminai.my.id", {
      content: q,
      user: username,
      prompt: logic,
      webSearchMode: false
})
    return response.data.result
} catch (error) {
    console.error('*[ 🌌 ] Error al obtener:*', error)
    throw error
}
  }
