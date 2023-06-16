const path = require('path')
const {spawn} = require('child_process')

module.exports = {
    name: 'aula',
    descricao: 'Mostra onde possui as aulas',
    showInHelp: false,
    run: async function (client, message, args) {
        try {
            let json;
            const turma = args[0] || 'ESOFT5S'
            const pathScript = path.resolve(__dirname, '../../python/labs.py')
            const python = spawn('python3', [pathScript, turma])

            python.stdout.on('data', data => {
                json = JSON.parse(data.toString())
            })

            python.on('error', err => {
                console.error(err)
            })

            python.on('close', async () => {
                if (json.length > 0) {
                    json = json.sort((a, b) => {return a.horario - b.horario})
                    let texto = json.map(a => `Horario: ${a.horario}\nBloco: ${a.bloco}\nLab: ${a.laboratorio}\nAula: ${a.reserva}`).join('\n\n')
                    texto += '\n\n_OBS: Este comando mostra apenas as aulas em laboratórios!_'
                    await client.sendText(message.chatId, texto)
                } else {
                    await client.sendText(message.chatId, 'Nenhum resultado\n\n_OBS: Este comando mostra apenas as aulas em laboratórios_')
                }
            })
        } catch (err) {
            console.error(err)
        }
    }
}