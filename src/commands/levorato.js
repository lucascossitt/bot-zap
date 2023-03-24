module.exports = {
    name: 'levorato',
    descricao: 'Diz quantas casadas o levorato comeu',
    showInHelp: false,
    run: async function (client, message, args) {
        try {
            client.countLevorato++
            await client.sendText(message.chatId, `Levorato comeu *${client.countLevorato}* casadas`)
        } catch (err) {
            console.error(err)
        }
    }
}