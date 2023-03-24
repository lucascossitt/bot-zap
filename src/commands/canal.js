module.exports = {
    name: 'canal',
    descricao: 'Diz quantas vezes o canal deu o cu',
    showInHelp: false,
    run: async function (client, message, args) {
        try {
            client.countCanal++
            await client.sendText(message.chatId, `Canal deu o cu *${client.countCanal}* vezes`)
        } catch (err) {
            console.error(err)
        }
    }
}