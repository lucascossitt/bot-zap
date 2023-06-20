const {TiktokDL} = require('@tobyg74/tiktok-api-dl')

module.exports = {
    name: 'tiktok',
    descricao: 'Baixa um video ou imagem do tiktok',
    showInHelp: true,
    run: async function (client, message, args) {
        try {
            const url = args[0]
            if (url) {
                await client.simulateTyping(message.chatId, true)
                await TiktokDL(url)
                    .then(async result => {
                        if (result.status === 'success') {
                            if (result.result.type === 'video') {
                                const urlDownload = result.result.video[0]
                                await client.sendImage(message.chatId, urlDownload, 'tiktok.mp4', '', message.id)
                                await client.simulateTyping(message.chatId, false)
                            } else if (result.result.type === 'image') {
                                const images = result.result.images
                                for await (let image of images) {
                                    await client.sendImage(message.chatId, image)
                                }
                                await client.simulateTyping(message.chatId, false)
                            }
                        } else {
                            await client.reply(message.chatId, 'Não foi possivel fazer o download', message.id)
                        }
                    })
                    .catch(err => console.error(err))
            }
        } catch (err) {
            console.error(err)
        }
    }
}