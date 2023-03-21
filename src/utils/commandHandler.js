const fs = require('fs')
const path = require('path')

module.exports = async function (client) {
    return new Promise(async function (resolve, reject) {
        try {
            const files = fs.readdirSync('./src/commands/').filter(file => file.endsWith('.js'))

            for await (const file of files) {
                const command = require(path.join(__dirname, `../commands/${file}`))
                client.commands.set(command.name, command)
            }

            await console.log('Todos os comandos carregados')
            await resolve()
        } catch (err) {
            reject(err)
        }
    })
}