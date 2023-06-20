const {TiktokDL} = require('@tobyg74/tiktok-api-dl')

module.exports = {
    name: 'tiktokaudio',
    descricao: 'Baixa o audio de um video do tiktok',
    showInHelp: true,
    run: async function (client, message, args) {
        try {
            const url = args[0]
            if (url) {
                await client.simulateTyping(message.chatId, true)
                await TiktokDL(url)
                    .then(async result => {
                        if (result.status === 'success') {
                            const audio = result.result.music[0]
                            await client.sendAudio(message.chatId, audio, message.id)
                            await client.simulateTyping(message.chatId, false)
                        } else {
                            await client.reply(message.chatId, 'Não foi possivel fazer o download', message.id)
                        }
                    })
                    .catch(err => console.error(err))
            }
        } catch (err) {
            console.error(err)
        }
    }
}