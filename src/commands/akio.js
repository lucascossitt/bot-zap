module.exports = {
    name: 'akio',
    descricao: 'Conta quantas vezes o akio derrubou o studeo',
    run: async function (client, message, args) {
        try {
            client.countAkio++
            await client.sendText(message.chatId, `Akio derrubou o studeo *${client.countAkio}* vezes`)
        } catch (err) {
            console.error(err)
        }
    }
}