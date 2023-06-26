const ffmpeg = require('fluent-ffmpeg')
const ytsr = require('ytsr')
const ytdl = require('ytdl-core')
const fs = require('fs')
const path = require('path')

module.exports = {
    name: 'youtube',
    descricao: 'Baixa um video do youtube',
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
                const downloadPath = path.resolve(__dirname, `../temp/download-${message.t}.mp4`)

                await client.simulateTyping(message.chatId, true)
                const stream = await ytdl(link, {quality: 'highest', filter: 'audioandvideo'})
                await ffmpeg(stream)
                    .save(downloadPath)
                    .on('error', err => console.error(err))
                    .on('end', async () => {
                        await client.sendImage(message.chatId, downloadPath, `youtube.mp4`, '', message.id)
                        await fs.unlinkSync(downloadPath)
                        await client.simulateTyping(message.chatId, false)
                    })
            }
        } catch (err) {
            console.error(err)
        }
    }
}