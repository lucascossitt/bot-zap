module.exports = {
    name: 'valentina',
    descricao: 'Diz quantas cervejas a valentina deve',
    showInHelp: false,
    run: async function (client, message, args) {
        try {
            client.countValentina++
            await client.sendText(message.chatId, `Valentina deve *${client.countValentina}* cervejas para meu criador`)
        } catch (err) {
            console.error(err)
        }
    }
}