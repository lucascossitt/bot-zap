module.exports = {
    name: 'broadcast',
    descricao: 'Apenas para o desenvolvedor',
    run: async function (client, message, args) {
        try {
            if (message.author === client.owner) {
                const aviso = args.join(' ')
                await client.getAllGroups().then(async groups => {
                    for await (let group of groups) {
                        await client.sendText(group.id, aviso)
                    }
                })
            } else {
                await client.react(message.id, '❌')
            }
        } catch (err) {
            console.error(err)
        }
    }
}