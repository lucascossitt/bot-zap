module.exports = {
    name: 'voteban',
    descricao: 'Votação para banir',
    run: async function (client, message, args) {
        try {
            await client.react(message.id, '✅')
            await client.react(message.id, '❌')
        } catch (err) {
            console.error(err)
        }
    }
}