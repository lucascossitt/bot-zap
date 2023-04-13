const memes = require('random-memes')

module.exports = {
    name: 'meme',
    descricao: 'Envia um meme aleatório',
    showInHelp: true,
    run: async function (client, message, args) {
        try {
            await client.simulateTyping(message.chatId, true)
            await memes
                .random()
                .then(async meme => {
                    await client.sendImage(message.chatId, meme.image, 'meme.jpg', meme.caption)
                    await client.simulateTyping(message.chatId, false)
                })
                .catch(err => console.error(err))
        } catch (err) {
            console.error(err)
        }
    }
}