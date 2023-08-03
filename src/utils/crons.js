const cron = require('node-cron')
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

    cron.schedule('0 0 * * * *', async () => {
        const xingamentoEscolhido = xingamentos[Math.floor(Math.random() * xingamentos.length)]
        await client.sendTextWithMentions(client.grupoTcholes, xingamentoEscolhido, false, ['554499940165@c.us'])
    })

    cron.schedule('0 0 15 * * *', async () => {
        await client.getGroupMembers(client.grupoTcholes).then(async members => {
            const membersId = members.map(a => a.id)
            await client.sendTextWithMentions(client.grupoTcholes, '*Manda foto de agora ai gatinha*', false, membersId)
        })
    })

    cron.schedule('0 */1 * * * *', async () => {
        await fetch('https://uptime.lucascossitt.cloud/api/push/m7XT170PsP?status=up&msg=OK&ping=').catch(err => console.error(err))
    })
}
