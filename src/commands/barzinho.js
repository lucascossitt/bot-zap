module.exports = {
    name: 'barzinho',
    descricao: 'Votação pra barzinho',
    showInHelp: false,
    run: async function (client, message, args) {
        try {
            await client.sendPoll(message.chatId, 'Barzinho hoje?', ['Com certeza', 'Ou', 'Não vo sou baitola'], null, false)
        } catch (err) {
            console.error(err)
        }
    }
}