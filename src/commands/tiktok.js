const tiktokDownload = require('tiktok-video-downloader')

module.exports = {
    name: 'tiktok',
    descricao: 'Baixa um video do tiktok',
    showInHelp: true,
    run: async function (client, message, args) {
        try {
            const url = args[0]
            if (url) {
                await client.simulateTyping(message.chatId, true)
                await tiktokDownload
                    .getInfo(url)
                    .then(async result => {
                        const urlDownload = result.video.url.wm
                        await client.sendImage(message.chatId, urlDownload, 'tiktok.mp4', '', message.id)
                        await client.simulateTyping(message.chatId, false)
                    })
                    .catch(err => console.error(err))
            }
        } catch (err) {
            console.error(err)
        }
    }
}