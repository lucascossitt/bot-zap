module.exports = {
    name: 'avisar',
    descricao: 'Envia um aviso marcando todos do grupo (DESENVOLVEDOR ONLY)',
    showInHelp: false,
    run: async function (client, message, args) {
        try {
            if (message.author === client.owner || message.isAdmin) {
                const aviso = args.join(' ')
                await client.getGroupMembers(message.chatId).then(async members => {
                    const membersId = members.map(a => a.id)
                    await client.sendTextWithMentions(message.chatId, aviso, false, membersId)
                })
            } else {
                await client.react(message.id, '❌')
            }
        } catch (err) {
            console.error(err)
        }
    }
}