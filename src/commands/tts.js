const path = require('path')
const GTTS = require('gtts')
const fs = require('fs')

module.exports = {
    name: 'tts',
    descricao: 'Converte um texto para audio',
    showInHelp: true,
    run: async function (client, message, args) {
        try {
            const texto = args.join(' ')
            if (texto) {
                const filePath = path.resolve(__dirname, `../../temp/${message.t}.mp3`)
                const writeStream = fs.createWriteStream(filePath)
                await client.simulateTyping(message.chatId, true)

                new GTTS(texto, 'pt-br').stream().pipe(writeStream)

                writeStream.on('finish', async () => {
                    await client.sendAudio(message.chatId, filePath, message.id)
                    await fs.unlinkSync(filePath)
                    await client.simulateTyping(message.chatId, false)
                })
            }
        } catch (err) {
            console.error(err)
        }
    }
}