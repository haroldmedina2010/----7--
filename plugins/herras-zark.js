import axios from 'axios';

let handler = async (m, { conn, usedPrefix, command, text}) => {
  const username = `${conn.getName(m.sender)}`;
  const sender = m.sender;
  const isOwner = global.owner.includes(sender.split('@')[0]);

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
    return conn.reply(m.chat, `*[ 😉 ] Ingrese un texto para hablar con Zark.*`, m);
}

  await conn.sendPresenceUpdate('composing', m.chat);

  try {
    const prompt = `${basePrompt} ${text}`;
    const response = await zarkAI(text, username, prompt);

    if (!response || typeof response!== 'string') {
      throw new Error('Respuesta inválida o vacía de la IA');
}

    await conn.reply(m.chat, response, m);
} catch (error) {
    console.error('❌ Error al obtener respuesta de Zark:', error.response?.data || error.message);
    await conn.reply(m.chat, '*Zark está en modo sombra. Intenta más tarde o verifica el servidor.*', m);
}
};

handler.help = ['zark'];
handler.tags = ['tools'];
handler.register = true;
handler.command = ['zark'];
export default handler;

// Función para interactuar con la IA usando prompts
async function zarkAI(q, username, logic) {
  try {
    const response = await axios.post('https://Luminai.my.id', {
      content: q,
      user: username,
      prompt: logic,
      webSearchMode: false
});

    if (response?.data?.result) {
      return response.data.result;
} else {
      throw new Error('La IA no devolvió una respuesta válida');
}
} catch (error) {
    console.error('❌ Error en la función zarkAI:', error.response?.data || error.message);
    throw error;
}
  }
