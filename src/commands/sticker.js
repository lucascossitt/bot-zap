const zap = require('@open-wa/wa-automate')

module.exports = {
    name: 'sticker',
    descricao: 'Transforma uma imagem em figurinha',
    showInHelp: true,
    run: async function (client, message, args) {
        try {
            if (message.type === 'image') {
                await client.simulateTyping(message.chatId, true)
                await zap
                    .decryptMedia(message)
                    .then(async mediaData => {
                        await client.sendImageAsSticker(message.chatId, mediaData)
                        await client.simulateTyping(message.chatId, false)
                    })
                    .catch(err => console.error(err))
            } else if (message.type === 'video') {
                await client.simulateTyping(message.chatId, true)
                await zap
                    .decryptMedia(message)
                    .then(async mediaData => {
                        await client.sendMp4AsSticker(message.chatId, mediaData)
                        await client.simulateTyping(message.chatId, false)
                    })
                    .catch(err => console.error(err))
            }
        } catch (err) {
            console.error(err)
        }
    }
}