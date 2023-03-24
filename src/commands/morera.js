module.exports = {
    name: 'morera',
    descricao: 'Diz quantos % o morera escureceu',
    showInHelp: false,
    run: async function (client, message, args) {
        try {
            client.countMorera++
            await client.sendText(message.chatId, `Morera escureceu *${client.countMorera}%* hoje`)
        } catch (err) {
            console.error(err)
        }
    }
}