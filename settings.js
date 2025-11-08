import { watchFile, unwatchFile } from "fs"
import chalk from "chalk"
import { fileURLToPath } from "url"
import fs from "fs"

global.botNumber = "" 

global.owner = [
// ZONA DE JIDS
["584242773183", "harold </>", true],
["523328418129"],
["50493732693"],  
// ZONA DE LIDS 
["", "", true],
["", "", true], 
["", "", true]
]

global.mods = []
global.suittag = ["584242773183"] 
global.prems = []


global.libreria = "Baileys Multi Device"
global.vs = "^1.3.2"
global.nameqr = "shadow"
global.sessions = "Sessions/Principal"
global.jadi = "Sessions/SubBot"
global.MichiJadibts = true

global.botname = "Shadow-BOT-MD"
global.textbot = "MELIODAS-BOT, Harold"
global.dev = "MELODIAS-BOT"
global.author = "© mᥲძᥱ ᥕі𝗍һ Harold"
global.etiqueta = "Harold | 𝟤𝟢𝟤𝟧 ©"
global.currency = "¢ Pesos"
global.michipg = "https://adonixfiles.mywire.org/files/xzadonix_81.mp4"
global.icono = "https://qu.ax/Xktgw.jpg"
global.catalogo = fs.readFileSync('./lib/catalogo.jpg')


global.group = "https://chat.whatsapp.com/D80dadzwRq4LQqFGUntZfK?mode=ems_copy_t"
global.community = ""
global.channel = "https://whatsapp.com/channel/0029VbBt9P02ZjCgOYex1s11"
global.github = "https://github.com"
global.gmail = "minexdt@gmail.com"
global.ch = {
ch1: "120363405639090840@newsletter"
}


global.APIs = {
vreden: { url: "https://api.vreden.web.id", key: null },
delirius: { url: "https://api.delirius.store", key: null },
zenzxz: { url: "https://api.zenzxz.my.id", key: null },
siputzx: { url: "https://api.siputzx.my.id", key: null },
adonix: { url: "https://api-adonix.ultraplus.click", key: null }
}


let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
unwatchFile(file)
console.log(chalk.redBright("Update 'settings.js'"))
import(`${file}?update=${Date.now()}`)
})
