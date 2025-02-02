const tiktok = require('tiktok-scraper-without-watermark')

module.exports = {
    name: 'tiktok',
    descricao: 'Baixa um video do tiktok',
    showInHelp: true,
    run: async function (client, message, args) {
        try {
            const url = args[0]
            if (url) {
                await client.simulateTyping(message.chatId, true)
                await tiktok.tiktokdownload(url)
                    .then(async result => {
                        if (result && result.nowm) {
                            const urlDownload = result.nowm
                            await client.sendImage(message.chatId, urlDownload, 'tiktok.mp4', '', message.id)
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