const cron = require('node-cron')
const Giphy = require('@giphy/js-fetch-api')
const path = require('path')
const {spawn} = require('child_process')

const giphy = new Giphy.GiphyFetch('ZQX5mKX5JaAcI9cKijl1l6qVzBEaNZLW')
const xingamentos = [
    "JUNINHO FILHO DA PUTA",
    "VAI TOMA NO CU JUNINHO",
    "SUA MÃE É MINHA JUNINHO",
    "VAI DA MEIA HORA DE RABO JUNINHO",
    "ME MAMA JUNINHO",
    "JUNINHO OTARIO",
    "JUNINHO DA O CU",
    "JUNINHO MAMA O GRUPO",
    "TE ODIAMOS JUNINHO",
    "VSF JUNINHO",
    "JUNINHO AMA A IARA",
    "JUNINHO É TCHOLA",
    "JUNINHO BAITOLA"
]

module.exports = async function (client) {
    // cron.schedule('0 0 8 * * *', async () => {
    //     await giphy
    //         .search('bom dia')
    //         .then(async result => {
    //             const gifs = result.data
    //             const gifEscolhido = gifs[Math.floor(Math.random() * gifs.length)]
    //             await client.getAllGroups()
    //                 .then(async groups => {
    //                     for await (let group of groups) {
    //                         await client.sendGiphy(group.id, `https://media.giphy.com/media/${gifEscolhido.id}/giphy.gif`, '')
    //                     }
    //                 })
    //         })
    //         .catch(err => console.error(err))
    // })

    // cron.schedule('0 0 13 * * *', async () => {
    //     await giphy
    //         .search('boa tarde')
    //         .then(async result => {
    //             const gifs = result.data
    //             const gifEscolhido = gifs[Math.floor(Math.random() * gifs.length)]
    //             await client.getAllGroups()
    //                 .then(async groups => {
    //                     for await (let group of groups) {
    //                         await client.sendGiphy(group.id, `https://media.giphy.com/media/${gifEscolhido.id}/giphy.gif`, '')
    //                     }
    //                 })
    //         })
    //         .catch(err => console.error(err))
    // })

    // cron.schedule('0 0 20 * * *', async () => {
    //     await giphy
    //         .search('boa noite')
    //         .then(async result => {
    //             const gifs = result.data
    //             const gifEscolhido = gifs[Math.floor(Math.random() * gifs.length)]
    //             await client.getAllGroups()
    //                 .then(async groups => {
    //                     for await (let group of groups) {
    //                         await client.sendGiphy(group.id, `https://media.giphy.com/media/${gifEscolhido.id}/giphy.gif`, '')
    //                     }
    //                 })
    //         })
    //         .catch(err => console.error(err))
    // })

    // cron.schedule('0 20 4 * * *', async () => {
    //     await giphy
    //         .search('maconha')
    //         .then(async result => {
    //             const gifs = result.data
    //             const gifEscolhido = gifs[Math.floor(Math.random() * gifs.length)]
    //             await client.getAllGroups()
    //                 .then(async groups => {
    //                     for await (let group of groups) {
    //                         await client.sendGiphy(group.id, `https://media.giphy.com/media/${gifEscolhido.id}/giphy.gif`, '')
    //                     }
    //                 })
    //         })
    //         .catch(err => console.error(err))
    // })

    cron.schedule('0 30 18 * * *', async () => {
        let json;
        const turma = 'ESOFT5S-N-A'
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
                const texto = json.map(a => `Horario: ${a.horario}\nBloco: ${a.bloco}\nLab: ${a.laboratorio}\nAula: ${a.reserva}`).join('\n\n')
                await client.sendText(client.grupoTcholes, texto)
            }
        })
    })

    cron.schedule('0 0 * * * *', async () => {
        const xingamentoEscolhido = xingamentos[Math.floor(Math.random() * xingamentos.length)]
        await client.sendTextWithMentions(client.grupoTcholes, xingamentoEscolhido, false, ['554499940165@c.us'])
        // await client.sendTextWithMentions('120363053408537500@g.us', xingamentoEscolhido, false, ['554499940165@c.us'])
    })
}
