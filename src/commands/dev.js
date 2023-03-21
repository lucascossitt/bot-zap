module.exports = {
    name: 'dev',
    descricao: 'Mande uma mensagem para o meu desenvolvedor com alguma sugestão, pedido ou reclamação',
    run: async function (client, message, args) {
        const texto = args.join(' ')
        if (texto) {
            await client.sendText(client.owner, texto)
            await client.react(message.id, '👍')
        }
    }
}