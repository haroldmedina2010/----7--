import fs from 'fs';
import path from 'path';

let handler = async (m, { conn }) => {
    m.react('🌙'); // Reacción al mensaje

    const messages = [
        "🌜 ¡Buenas noches! Que el descanso te renueve y los sueños te guíen a un mejor mañana.",
        "🌌 La noche es el lienzo donde los sueños toman forma. ¡Que tengas un descanso reparador!",
        "✨ Relájate y deja que la calma de la noche te envuelva. ¡Dulces sueños!",
        "🌠 Hoy puede haber sido un día difícil, pero el descanso traerá nuevas oportunidades mañana.",
        "🌙 ¡Buenas noches! Que las estrellas iluminen tu camino en tus sueños.",
        "💤 Cierra los ojos, respira profundo y deja que el mundo descanse contigo."
    ];

    let randomMessage = messages[Math.floor(Math.random() * messages.length)];

    if (m.isGroup) {
        const videos = [
            'https://files.catbox.moe/0n2bf5.mp4',
            'https://files.catbox.moe/zua131.mp4',
            'https://files.catbox.moe/0im4vk.mp4',
            'https://files.catbox.moe/9cm0x9.mp4',
            'https://files.catbox.moe/7kxjhv.mp4',
            'https://files.catbox.moe/id09sr.mp4'
        ];

        const video = videos[Math.floor(Math.random() * videos.length)];

        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: randomMessage }, { quoted: m });
    } else {
        conn.sendMessage(m.chat, { text: randomMessage }, { quoted: m });
    }
};

handler.help = ['buenasnoches/night'];
handler.tags = ['grupo'];
handler.command = ['buenasnoches', 'noche', 'night'];
handler.group = true;

export default handler;
