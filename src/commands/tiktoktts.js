const { config, createAudioFromText } = require('tiktok-tts')
const path = require('path')
const fs = require("fs");
config('3de8bd23fed0741832be31cbb1db51bb')
const speakers = ['br_001', 'br_003', 'br_004', 'br_005']

module.exports = {
    name: 'tiktoktts',
    descricao: 'Texto para voz do tiktok',
    showInHelp: true,
    run: async function (client, message, args) {
        try {
            const texto = args.join(' ')
            if (texto) {
                const filePath = path.resolve(__dirname, `../../temp/${message.t}.mp3`)
                const randomIndex = Math.floor(Math.random() * speakers.length)
                await client.simulateTyping(message.chatId, true)
                await createAudioFromText(texto, filePath, speakers[randomIndex])
                await client.sendAudio(message.chatId, filePath, message.id)
                await fs.unlinkSync(filePath)
                await client.simulateTyping(message.chatId, false)
            }
        } catch (err) {
            console.error(err)
        }
    }
}