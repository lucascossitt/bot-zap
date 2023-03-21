const twitterDownload = require('twitter-url-direct')

module.exports = {
    name: 'twitter',
    descricao: 'Baixa um video do twitter',
    run: async function (client, message, args) {
        try {
            const url = args[0]
            if (url) {
                await client.simulateTyping(message.chatId, true)
                await twitterDownload(url)
                    .then(async result => {
                        const urlDownload = result.download[result.download.length - 1].url
                        await client.sendImage(message.chatId, urlDownload, 'video.mp4', '')
                        await client.simulateTyping(message.chatId, false)
                    })
                    .catch(err => console.error(err))
            }
        } catch (err) {
            console.error(err)
        }
    }
}