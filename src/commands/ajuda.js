module.exports = {
    name: 'ajuda',
    descricao: 'Mostra todos os comandos e suas funções',
    showInHelp: true,
    run: async function (client, message, args) {
        try {
            let listaComandos = 'Meus comandos:\n\n'

            for await (let [key, value] of client.commands.entries()) {
                if (value.showInHelp)
                    listaComandos += `*- ${value.name}:* ${value.descricao}\n\n`
            }

            listaComandos += `(OBS: Sempre utilizar "!" antes de qualquer comando)`

            await client.sendText(message.chatId, listaComandos)
        } catch (err) {
            console.error(err)
        }
    }
}