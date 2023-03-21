module.exports = {
    name: 'gpt',
    descricao: 'Converse com o chat GPT',
    run: async function (client, message, args) {
        try {

            // if (message.chatId !== client.grupoTcholes && message.author !== client.owner) {
            //     return await client.react(message.id, '❌')
            // }

            const {ChatGPTAPI} = await import('chatgpt')
            const chatGPT = new ChatGPTAPI({apiKey: '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'})

            const texto = args.join(' ')
            if (texto) {
                const conversa = client.conversasChatGPT.find(a => a.userId === message.author)

                if (texto === 'encerrar') {
                    if (conversa) {
                        client.conversasChatGPT.splice(client.conversasChatGPT.indexOf(conversa), 1)
                    }
                    return await client.react(message.id, '👍')
                }

                if (conversa) {
                    await client.simulateTyping(message.chatId, true)
                    await chatGPT
                        .sendMessage(texto, {
                            conversationId: conversa.conversationId,
                            parentMessageId: conversa.id
                        })
                        .then(async response => {
                            client.conversasChatGPT.splice(client.conversasChatGPT.indexOf(conversa), 1)
                            client.conversasChatGPT.push({
                                userId: message.author,
                                conversationId: response.conversationId,
                                id: response.id,
                                data: new Date()
                            })
                            await client.reply(message.chatId, response.text, message.id)
                            await client.simulateTyping(message.chatId, false)
                        })
                        .catch(err => console.error(err))
                } else {
                    await client.simulateTyping(message.chatId, true)
                    await chatGPT
                        .sendMessage(texto)
                        .then(async response => {
                            client.conversasChatGPT.push({
                                userId: message.author,
                                conversationId: response.conversationId,
                                id: response.id,
                                data: new Date()
                            })
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