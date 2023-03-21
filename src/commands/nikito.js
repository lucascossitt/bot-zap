module.exports = {
    name: 'nikito',
    descricao: 'Diz quantas vezes o nikito atrasou pro trabalho',
    run: async function (client, message, args) {
        try {
            client.countNikito++
            await client.sendText(message.chatId, `Nikito atrasou *${client.countNikito}* vezes no trabalho`)
        } catch (err) {
            console.error(err)
        }
    }
}