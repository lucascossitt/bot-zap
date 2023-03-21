const reddit = require('reddit-posts')

module.exports = {
    name: 'copypasta',
    descricao: 'Envia uma copypasta aleatória',
    run: async function (client, message, args) {
        try {
            await client.simulateTyping(message.chatId, true)
            await reddit.GetRandompost('copypastabr')
                .then(async response => {
                    await client.sendText(message.chatId, `*${response.title}*\n\n${response.selftext}`)
                    await client.simulateTyping(message.chatId, false)
                })
                .catch(err => console.error(err))
        } catch (err) {
            console.error(err)
        }
    }
}