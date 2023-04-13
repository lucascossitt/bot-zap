const videoUrlLink = require('video-url-link')

module.exports = {
    name: 'twitter',
    descricao: 'Baixa um video do twitter',
    showInHelp: true,
    run: async function (client, message, args) {
        try {
            const url = args[0]
            if (url) {
                await client.simulateTyping(message.chatId, true)
                videoUrlLink.twitter.getInfo(url, {}, async function (err, data) {
                    if (err) {
                        console.error(err)
                    } else {
                        const urlDownload = data.variants.filter(a => a.content_type === 'video/mp4').sort((a, b) => b.bitrate - a.bitrate)[0].url
                        await client.sendImage(message.chatId, urlDownload, 'video.mp4', '')
                        await client.simulateTyping(message.chatId, false)
                    }
                })
            }
        } catch (err) {
            console.error(err)
        }
    }
}