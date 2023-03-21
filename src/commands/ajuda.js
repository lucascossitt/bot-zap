module.exports = {
    name: 'ajuda',
    descricao: 'Mostra todos os comandos e suas funções',
    run: async function (client, message, args) {
        try {
            let listaComandos = 'Meus comandos:\n\n'

            for await (let [key, value] of client.commands.entries()) {
                console.log(key, value)
                listaComandos += `*- ${value.name}:* ${value.descricao}\n\n`
            }

            await client.sendText(message.chatId, listaComandos)
        } catch (err) {
            console.error(err)
        }
    }
}