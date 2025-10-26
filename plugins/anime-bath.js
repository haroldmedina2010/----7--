import fs from 'fs';
import path from 'path';

let handler = async (m, { conn, usedPrefix }) => {
    let who;

    if (m.mentionedJid.length > 0) {
        who = m.mentionedJid[0]; 
    } else if (m.quoted) {
        who = m.quoted.sender; 
    } else {
        who = m.sender; 
    }

    let name = conn.getName(who); 
    let name2 = conn.getName(m.sender); 
    m.react('🚿'); // Reacción al mensaje

    let str;
    if (m.mentionedJid.length > 0 || m.quoted) {
        str = `🛀 \`${name2}\` *está dándole un buen baño a* \`${name || who}\`.`;
    } else {
        str = `🛀 \`${name2}\` *se está duchando con agua bien caliente!*`.trim();
    }
    
    if (m.isGroup) {
        const videos = [
            'https://qu.ax/GYUbw.mp4', 
            'https://qu.ax/SUjrf.jpg', 
            'https://qu.ax/aeWeX.jpg',
            'https://qu.ax/SUjrf.jpg',
            'https://qu.ax/SUjrf.jpg',
            'https://qu.ax/lghet.jpg'  
        ];

        const video = videos[Math.floor(Math.random() * videos.length)];
      
        let mentions = [who]; 
        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions }, { quoted: m });
    } else {
        conn.sendMessage(m.chat, { text: str }, { quoted: m });
    }
}

handler.help = ['bath/bañarse @tag'];
handler.tags = ['diversión'];
handler.command = ['bath', 'ducha', 'bañarse'];
handler.group = true;

export default handler;
