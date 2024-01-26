const config = require('../config')
const fg = require('api-dylux');
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
const apkdl = require('../lib/apkdl')

cmd({
    pattern: "apk",
    alias: ["findapk","playstore"],
    react: "📱",
    desc: "Download apk from playstore.",
    category: "download",
    use: '.apk whatsapp',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return await conn.sendMessage(from , { text:'*Need app name !!*' }, { quoted: mek } )        
const data2 = await apkdl.search(q)
const dat2a = data2
if (dat2a.length < 1) return await conn.sendMessage(from, { text: '*Not found !!*'}, { quoted: mek } )
const data = await apkdl.download(dat2a[0].id)
let listdata = `*📚 Name :* ${data.name}
*📦 Developer :* ${data.package}
*⬆️ Last update :* ${data.lastup}
*📥 Size :* ${data.size}`
await conn.sendMessage(from, { image: { url: data.icon }, caption: listdata }, { quoted: mek })
if (data.size.includes('GB')) return await conn.sendMessage(from , { text: '*This video too big !!*' }, { quoted: mek } )
if (data.size.includes('MB') && data.size.replace(' MB','') > config.MAX_SIZE) return await conn.sendMessage(from , { text: '*This video too big !!*' }, { quoted: mek } )
let sendapk = await conn.sendMessage(from , { document : { url : data.dllink  } , mimetype : 'application/vnd.android.package-archive' , fileName : data.name + '.' + 'apk',caption: '' } , { quoted: mek })
await conn.sendMessage(from, { react: { text: '📁', key: sendapk.key }})
} catch (e) {
reply('*Error !!*')
l(e)
}
})