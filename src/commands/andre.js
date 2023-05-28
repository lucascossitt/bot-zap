module.exports = {
    name: 'andre',
    descricao: 'Conta quantos kg o andre engordou',
    showInHelp: false,
    run: async function (client, message, args) {
        try {
            client.countAndre++
            await client.sendText(message.chatId, `Andre engordou *${client.countAndre}* kg hoje`)
        } catch (err) {
            console.error(err)
        }
    }
}