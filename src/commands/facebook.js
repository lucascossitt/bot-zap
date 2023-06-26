const snapsave = require('snapsave-downloader')

module.exports = {
    name: 'facebook',
    descricao: 'Baixa um video do facebook',
    showInHelp: true,
    run: async function (client, message, args) {
        try {
            const url = args[0]
            if (url) {
                await client.simulateTyping(message.chatId, true)
                await snapsave(url)
                    .then(async result => {
                        if (result && result.status && result.data.length > 0) {
                            const urlDownload = result.data[0].url
                            await client.sendImage(message.chatId, urlDownload, 'facebook.mp4', '', message.id)
                            await client.simulateTyping(message.chatId, false)
                        } else {
                            await client.reply(message.chatId, 'Não foi possivel fazer o download', message.id)
                        }
                    })
            }
        } catch (err) {
            console.error(err)
        }
    }
}