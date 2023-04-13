module.exports = {
    name: 'dev',
    descricao: 'Mande uma mensagem para o meu desenvolvedor com alguma sugestão, pedido ou reclamação',
    showInHelp: true,
    run: async function (client, message, args) {
        const texto = args.join(' ')
        if (texto) {
            await client.sendText(client.owner, `${message.notifyName} - ${message.from}\n\n${texto}`)
            await client.react(message.id, '👍')
        }
    }
}