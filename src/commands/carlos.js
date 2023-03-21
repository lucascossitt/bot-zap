module.exports = {
    name: 'carlos',
    descricao: 'Conta quantas vezes o carlos coringou',
    run: async function (client, message, args) {
        try {
            client.countCarlos++
            await client.sendText(message.chatId, `Carlos coringou *${client.countCarlos}* vezes`)
        } catch (err) {
            console.error(err)
        }
    }
}