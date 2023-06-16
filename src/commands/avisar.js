module.exports = {
    name: 'avisar',
    descricao: 'Envia um aviso marcando todos do grupo (Apenas para admins)',
    showInHelp: true,
    run: async function (client, message, args) {
        try {
            const admins = await client.getGroupAdmins(message.chatId)
            const isAdmin = admins.includes(message.author)
            if (message.author === client.owner || isAdmin) {
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