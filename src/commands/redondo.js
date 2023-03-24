module.exports = {
    name: 'redondo',
    descricao: 'Diz quantas vezes o redondo foi burro',
    showInHelp: false,
    run: async function (client, message, args) {
        try {
            client.countRedondo++
            await client.sendText(message.chatId, `Redondo foi burro *${client.countRedondo}* vezes`)
        } catch (err) {
            console.error(err)
        }
    }
}