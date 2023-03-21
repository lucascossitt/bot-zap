const zap = require('@open-wa/wa-automate')

module.exports = {
    name: 'sticker',
    descricao: 'Transforma uma imagem em figurinha',
    run: async function (client, message, args) {
        try {
            if (message.type === 'image') {
                await client.simulateTyping(message.chatId, true)
                await zap
                    .decryptMedia(message)
                    .then(async mediaData => {
                        const imageBase64 = `data:${message.mimetype};base64,${mediaData.toString('base64')}`
                        await client.sendImageAsSticker(message.chatId, imageBase64)
                        await client.simulateTyping(message.chatId, false)
                    })
                    .catch(err => console.error(err))
            }
        } catch (err) {
            console.error(err)
        }
    }
}