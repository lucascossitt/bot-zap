module.exports = {
    name: 'gpt',
    descricao: 'Converse com o chat GPT',
    showInHelp: true,
    run: async function (client, message, args) {
        try {

            const {ChatGPTAPI} = await import('chatgpt')
            const chatGPT = new ChatGPTAPI({
                apiKey: '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'
            })

            const texto = args.join(' ')
            if (texto) {
                const conversa = client.conversasChatGPT.get(message.author)

                if (texto === 'encerrar') {
                    if (conversa) {
                        client.conversasChatGPT.delete(message.author)
                    }
                    return await client.react(message.id, '👍')
                }

                if (conversa) {
                    await client.simulateTyping(message.chatId, true)
                    await chatGPT
                        .sendMessage(texto, {
                            parentMessageId: conversa.id
                        })
                        .then(async response => {
                            client.conversasChatGPT.delete(message.author)
                            client.conversasChatGPT.set(message.author, {id: response.id})
                            await client.reply(message.chatId, response.text, message.id)
                            await client.simulateTyping(message.chatId, false)
                        })
                        .catch(err => console.error(err))
                } else {
                    await client.simulateTyping(message.chatId, true)
                    await chatGPT
                        .sendMessage(texto)
                        .then(async response => {
                            client.conversasChatGPT.set(message.author, {id: response.id})
                            await client.reply(message.chatId, response.text, message.id)
                            await client.simulateTyping(message.chatId, false)
                        })
                        .catch(err => console.error(err))
                }
            }
        } catch (err) {
            console.error(err)
        }
    }
}