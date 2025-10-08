const estados = [
  { id: 'triste', texto: 'Triste 😢'},
  { id: 'roto', texto: 'Roto 💔'},
  { id: 'vacío', texto: 'Vacío 🕳️'},
  { id: 'ansioso', texto: 'Ansioso 😰'},
  { id: 'abrazo', texto: 'Abrazo 🤗'},
  { id: 'cállate', texto: 'Cállate bot 😒'}
];

const frases = {
  triste: [
    'Aunque duela, no te detengas. El dolor también te está formando.',
    'No estás solo. A veces llorar es parte de sanar.',
    'La tristeza no es debilidad, es humanidad.',
    'Cada lágrima que cae riega tu fortaleza.',
    'Incluso los días grises tienen su belleza.'
  ],
  roto: [
    'Las piezas rotas pueden formar algo más fuerte.',
    'Tu corazón puede estar roto, pero tu alma sigue intacta.',
    'Cada grieta deja entrar luz. No te apagues.',
    'El dolor no te destruye, te transforma.',
    'Ser roto no es el final, es el inicio de tu reconstrucción.'
  ],
  vacío: [
    'El vacío no es el fin, es espacio para reconstruirte.',
    'A veces perderse es el primer paso para encontrarse.',
    'Llena tu silencio con amor propio.',
    'El vacío también puede ser paz si lo abrazas.',
    'No estás incompleto, estás en pausa.'
  ],
  ansioso: [
    'Respira. No todo lo que imaginas es real.',
    'Tu mente corre, pero tú puedes caminar.',
    'No estás fallando, estás sobreviviendo.',
    'La ansiedad no te define, es solo una ola que pasará.',
    'Tu calma está más cerca de lo que crees.'
  ],
  cállate: [
    'Cállate tú, que ni el WiFi te quiere conectar 😒',
    '¿Cállate bot? Bro, ni tu ex te ignora tanto como yo lo haré.',
    'Tu silencio es música, pero tu actitud es ruido. Relájate.',
    'Cállate bot... ¿Y tú quién eres? ¿El jefe del sarcasmo?',
    'Si me callo, ¿quién te va a dar sentido hoy?'
  ],
  abrazo: [
    '🤗 Aquí tienes un abrazo digital. No estás solo.',
    'A veces un abrazo silencioso dice más que mil palabras.',
    'Este abrazo viene desde las sombras para reconfortarte.',
    'No puedo abrazarte físicamente, pero sí con palabras.',
    'Tu alma merece ternura. Aquí va un poco.'
  ]
};

const abrazoUrl = 'https://qu.ax/smhnj.jpg';

let modoOscuro = false;
let estadoUsuario = {};

const handler = async (m, { command, conn, isGroup}) => {
  const userId = m.sender;

  if (command === 'modooscuro') {
    modoOscuro = true;
    return m.reply('🌑 Modo oscuro activado. Las respuestas ahora serán más sombrías...');
}

  if (command === 'comotesientes') {
    return await conn.sendMessage(m.chat, {
      text: '🖤 ¿Cómo te sientes hoy?',
      footer: isGroup? 'Grupo conectado con las emociones': 'Tu espacio seguro',
      buttons: estados.map(e => ({
        buttonId: `.${e.id}`,
        buttonText: { displayText: e.texto},
        type: 1
})),
      headerType: 1
}, { quoted: m});
}

  if (estados.some(e => e.id === command)) {
    estadoUsuario[userId] = command;

    const hora = new Date().getHours();
    let intro = '';
    if (modoOscuro) {
      intro = '🌑 Las sombras susurran:';
} else if (hora < 12) {
      intro = '☀️ Buenos días. Aquí va una frase para ti:';
} else if (hora < 18) {
      intro = '🌤️ Tarde tranquila. Esto podría ayudarte:';
} else {
      intro = '🌙 Noche profunda. Aquí va algo para tu alma:';
}

    const frase = frases[command][Math.floor(Math.random() * frases[command].length)];

    if (command === 'abrazo') {
      await conn.sendMessage(m.chat, {
        image: { url: abrazoUrl},
        caption: `${intro}\n\n${frase}`,
        footer: '🤗',
        buttons: [{ buttonId: '.comotesientes', buttonText: { displayText: 'Elegir otro estado'}, type: 1}],
        headerType: 4
}, { quoted: m});
} else {
      await conn.sendMessage(m.chat, {
        text: `${intro}\n\n${frase}`,
        footer: command === 'cállate'? '😒': '🖤',
buttons: [{ buttonId: '.comotesientes', buttonText: { displayText: 'Elegir otro estado'}, type: 1}],
        headerType: 1
}, { quoted: m});
}

    return;
}

  if (estadoUsuario[userId]) {
    const estado = estadoUsuario[userId];
    const frase = frases[estado][Math.floor(Math.random() * frases[estado].length)];
    return m.reply(`🖤 Sigues sintiéndote *${estado}*. Aquí tienes otra:\n\n${frase}`);
}

  m.reply('⚠️ No reconozco ese estado de ánimo.');
};

handler.command = handler.help = ['comotesientes', 'modooscuro',...estados.map(e => e.id)];
handler.tags = ['emocional', 'motivación'];
export default handler;
