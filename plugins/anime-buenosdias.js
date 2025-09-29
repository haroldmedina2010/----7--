import fs from 'fs';
import path from 'path';

let handler = async (m, { conn }) => {
    // Si tu entorno permite reacciones así, perfecto. Si no, cámbialo a await conn.sendMessage react.
    m.react?.('🌟'); 

    const messages = [
        "¡Hola! 🌟 Que este momento esté lleno de felicidad y energía positiva.",
        "¡Qué gusto verte! 🌈 Recuerda que cada día es una nueva oportunidad.",
        "¡Espero que estés disfrutando! 🦋 La vida está llena de pequeñas maravillas.",
        "¡Hola! 🌼 Hoy puede ser el comienzo de algo increíble.",
        "¡Saludos! 🌺 Recuerda que eres más fuerte de lo que piensas.",
        "¡Hola! 🌞 Siempre hay un motivo para sonreír, ¡encuéntralo!"
    ];

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    if (m.isGroup) {
        const gifs = [
            'https://files.catbox.moe/p5ohdf.mp4', 
            'https://files.catbox.moe/b8attz.mp4', 
            'https://files.catbox.moe/s0317p.mp4',
            'https://files.catbox.moe/esipij.mp4',
            'https://files.catbox.moe/088r37.mp4'
        ];

        const gif = gifs[Math.floor(Math.random() * gifs.length)];

        await conn.sendMessage(m.chat, {
            video: { url: gif },
            caption: randomMessage,
            gifPlayback: true
        }, { quoted: m });
    } else {
        await conn.sendMessage(m.chat, { text: randomMessage }, { quoted: m });
    }
};

handler.help = ['saludo/greeting'];
handler.tags = ['grupo'];
handler.command = ['saludo', 'greet', 'hi'];
handler.group = true;

export default handler;
