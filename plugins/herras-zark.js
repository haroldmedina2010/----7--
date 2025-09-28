import axios from 'axios';

let handler = async (m, { conn, usedPrefix, command, text}) => {
  const username = `${conn.getName(m.sender)}`;
  const sender = m.sender;

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

Ahora responde lo siguiente:`;

  if (!text) {
    return conn.reply(m.chat, `*[ 😈 ] Escribe algo para que Zark te responda.*`, m);
}

  await conn.sendPresenceUpdate('composing', m.chat);

  try {
    const prompt = `${basePrompt} ${text}`;
    const response = await axios.get(`https://api-adonix.ultraplus.click/api/gpt?prompt=${encodeURIComponent(prompt)}`);

    if (!response.data || typeof response.data!== 'string') {
      throw new Error('Respuesta inválida de la API Adonix');
}

    await conn.reply(m.chat, response.data.trim(), m);
} catch (error) {
    console.error('❌ Error al obtener respuesta de Zark:', error.response?.data || error.message);
    await conn.reply(m.chat, '*Zark está en modo sombra. Intenta más tarde o verifica la API.*', m);
}
};

handler.help = ['zark'];
handler.tags = ['tools'];
handler.register = true;
handler.command = ['zark'];
export default handler;
