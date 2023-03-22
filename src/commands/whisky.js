module.exports = {
    name: 'whisky',
    descricao: 'Oq é programar...',
    run: async function (client, message, args) {
        try {
            await client.sendText(message.chatId, `Oq é programar sem beber um whisky`)
        } catch (err) {
            console.error(err)
        }
    }
}