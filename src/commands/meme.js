const reddit = require('reddit-posts')

module.exports = {
    name: 'meme',
    descricao: 'Envia um meme aleatório',
    showInHelp: true,
    run: async function (client, message, args) {
        try {
            const busca = args[0] || 'darkmemers'
            await client.simulateTyping(message.chatId, true)
            await reddit.GetRandompost(busca)
                .then(async response => {
                    if (response.ImageURL) {
                        await client.sendImage(message.chatId, response.ImageURL, 'meme.jpg')
                    }
                    await client.simulateTyping(message.chatId, false)
                })
                .catch(err => console.error(err))
        } catch (err) {
            console.error(err)
        }
    }
}