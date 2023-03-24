const ffmpeg = require('fluent-ffmpeg')
const ytsr = require('ytsr')
const ytdl = require('ytdl-core')
const fs = require('fs')
const path = require('path')

module.exports = {
    name: 'youtube',
    descricao: 'Baixa um audio do youtube',
    showInHelp: true,
    run: async function (client, message, args) {
        try {

            if (!fs.existsSync(path.resolve(__dirname, '../temp')))
                fs.mkdirSync(path.resolve(__dirname, '../temp'))

            let link

            if (ytdl.validateURL(args.join(' '))) {
                link = args.join(' ')
            } else {
                const result = await ytsr(args.join(' '))
                link = result.items[0].url
            }

            if (link) {
                const downloadPath = path.resolve(__dirname, `../temp/download-${message.t}.mp3`)

                await client.simulateTyping(message.chatId, true)
                const stream = await ytdl(link, {quality: 'highestaudio'})
                await ffmpeg(stream)
                    .audioBitrate(128)
                    .save(downloadPath)
                    .on('end', async () => {
                        await client.sendAudio(message.chatId, downloadPath, message.id)
                        await fs.unlinkSync(downloadPath)
                        await client.simulateTyping(message.chatId, false)
                    })
            }
        } catch (err) {
            console.error(err)
        }
    }
}