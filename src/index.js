const zap = require('@open-wa/wa-automate')
const mime = require('mime-types')
const commandHandler = require('./utils/commandHandler')
const crons = require('./utils/crons')
const prefix = '!'

zap.create({
    sessionId: "BOT_TCHOLES",
    multiDevice: true,
    authTimeout: 60,
    blockCrashLogs: true,
    disableSpins: true,
    headless: true,
    hostNotificationLang: 'PT_BR',
    logConsole: false,
    popup: false,
    qrTimeout: 0,
    useChrome: true
}).then(async client => {

    client.commands = new Map()
    client.conversasChatGPT = []
    client.countCanal = 1
    client.countRedondo = 1
    client.countNikito = 1
    client.countMorera = 1
    client.countLevorato = 1
    client.countAkio = 1
    client.countCarlos = 1
    client.owner = '554498561224@c.us'
    client.grupoTcholes = '120363021769457254@g.us'
    client.grupoBot = '120363050664168601@g.us'
    client.bot = '554488441949@c.us'

    await commandHandler(client)
        .then(async () => {
            await crons(client)
            await client.onMessage(async message => {
                try {
                    if (message.text.split(' ').includes('deus')) {
                        await client.reply(message.chatId, 'NÃO SE ESCREVE DEUS COM D MINUSCULO SEU ARROMBADO', message.id)
                    }

                    if (message.text.toLowerCase().split(' ').includes('duvido')) {
                        await client.reply(message.chatId, 'MEU PAU NO SEU OUVIDO', message.id)
                    }

                    if (message.text.startsWith(prefix)) {
                        const args = message.text.split(' ')
                        const commandName = args.shift().replace(prefix, '').toLowerCase()

                        let command = client.commands.get(commandName)
                        if (command) {
                            command.run(client, message, args)
                        }
                    }
                } catch (err) {
                    console.error(err)
                }
            })
        })
        .catch(err => console.error(err))

    await client.onMessageDeleted(async message => {
        try {
            if (message.from === client.bot) return
            if (message.type === 'image') {
                await zap
                    .decryptMedia(message)
                    .then(async mediaData => {
                        const filename = `${message.t}.${mime.extension(message.mimetype)}`
                        const imageBase64 = `data:${message.mimetype};base64,${mediaData.toString('base64')}`
                        await client.sendImage(message.from, imageBase64, filename, `*DEDO DURO!*\n${message.notifyName} apagou a foto`)
                    })
                    .catch(err => console.error(err))
            } else {
                await client.sendText(message.from, `*DEDO DURO!*\n${message.notifyName} apagou a mensagem: _${message.body}_`)
            }
        } catch (err) {
            console.error(err)
        }
    })
}).catch(err => console.error(err))
