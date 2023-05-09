const zap = require('@open-wa/wa-automate')
const commandHandler = require('./utils/commandHandler')
const crons = require('./utils/crons')
const path = require('path')
const ffmpeg = require('fluent-ffmpeg')
const {Readable} = require('stream')
const fs = require('fs')
const whisper = require('./services/OpenAI/whisper')
const messageDeletedEvent = require('./events/messageDeleted')

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
    const {default: PQueue} = await import('p-queue')

    client.prefix = '!'
    client.commands = new Map()
    client.conversasChatGPT = new Map()
    client.countCanal = 1
    client.countRedondo = 1
    client.countNikito = 1
    client.countMorera = 1
    client.countLevorato = 1
    client.countAkio = 1
    client.countCarlos = 1
    client.countValentina = 1
    client.owner = '554498561224@c.us'
    client.grupoTcholes = '120363021769457254@g.us'
    client.bot = '554488441949@c.us'
    client.queue = new PQueue({
        concurrency: 1,
        autoStart: false
    })

    await commandHandler(client)
        .then(async () => {
            await client.queue.start()
            await crons(client)
            await client.onMessage(async message => {
                try {
                    await client.sendSeen(message.chatId)
                    if (message.text) {
                        if (message.text.split(' ').includes('deus')) {
                            await client.reply(message.chatId, 'NÃO SE ESCREVE DEUS COM D MINUSCULO SEU ARROMBADO', message.id)
                        }

                        if (message.text.toLowerCase().split(' ').includes('duvido')) {
                            await client.reply(message.chatId, 'MEU PAU NO SEU OUVIDO', message.id)
                        }

                        if (message.text.toLowerCase().split(' ').includes('atenção')) {
                            await client.reply(message.chatId, 'MEU PAU NA SUA MÃO', message.id)
                        }

                        if (message.text.startsWith(client.prefix)) {
                            const args = message.text.split(' ')
                            const commandName = args.shift().replace(client.prefix, '').toLowerCase()

                            let command = client.commands.get(commandName)
                            if (command) {
                                if (commandName === "eval") {
                                    await command.run(client, message, args)
                                } else {
                                    client.queue.add(async () => await command.run(client, message, args))
                                }
                            }
                        }
                    }

                    if (message.type === 'ptt') {
                        await zap
                            .decryptMedia(message)
                            .then(async mediaData => {
                                if (!fs.existsSync(path.resolve(__dirname, '../temp')))
                                    fs.mkdirSync(path.resolve(__dirname, '../temp'))

                                const filePath = path.resolve(__dirname, `../temp/${message.t}.mp3`)
                                const stream = Readable.from(mediaData)
                                await ffmpeg(stream)
                                    .audioBitrate(128)
                                    .save(filePath)
                                    .on('error', err => console.error(err))
                                    .on('end', async () => {
                                        await whisper(fs.createReadStream(filePath))
                                            .then(async result => {
                                                if (result.text) {
                                                    await client.reply(message.chatId, result.text, message.id)
                                                }
                                            })
                                            .catch(err => console.error(err))

                                        await fs.unlinkSync(filePath)
                                    })
                            })
                            .catch(err => console.error(err))
                    }
                } catch (err) {
                    console.error(err)
                }
            })
        })
        .catch(err => console.error(err))

    await client.onMessageDeleted(async message => await messageDeletedEvent(client, message))
}).catch(err => console.error(err))
