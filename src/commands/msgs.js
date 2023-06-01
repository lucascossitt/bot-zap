module.exports = {
    name: 'msgs',
    descricao: 'Mostra quantas mensagens vc ja enviou',
    showInHelp: false,
    run: async function (client, message, args) {
        try {
            await message.reply(message.chatId, `Você ja enviou *${message.userDb.qtdeMensagens}* mensagens`, message.id)
        } catch (err) {
            console.error(err)
        }
    }
}