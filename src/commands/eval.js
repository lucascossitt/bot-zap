module.exports = {
    name: 'eval',
    descricao: 'Apenas para o desenvolvedor',
    run: async function (client, message, args) {
        try {
            if (message.author === client.owner) {
                const texto = args.join(' ')
                const result = new Promise(async (resolve, reject) => {
                    try {
                        const output = eval(texto)
                        resolve(output)
                    } catch (err) {
                        reject(err)
                    }
                })

                await result
                    .then(async output => {
                        if (typeof output !== 'string') {
                            output = require('util').inspect(output, {depth: 0})
                            await client.sendText(message.chatId, output)
                        }
                    })
                    .catch(async err => {
                        if (typeof err !== 'string') {
                            err = require('util').inspect(err, {depth: 0})
                            await client.sendText(message.chatId, err)
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