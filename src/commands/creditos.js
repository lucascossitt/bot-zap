module.exports = {
    name: 'creditos',
    descricao: 'Mostras as informações sobre meu criador',
    showInHelp: true,
    run: async function (client, message, args) {
        try {
            await client.sendText(message.chatId, `Siga meu criador no instagram: @cossitt_lucas`)
        } catch (err) {
            console.error(err)
        }
    }
}