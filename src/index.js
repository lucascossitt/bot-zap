const zap = require('@open-wa/wa-automate')
const mime = require('mime-types')
const commandHandler = require('./utils/commandHandler')
const crons = require('./utils/crons')
const path = require('path')
const ffmpeg = require('fluent-ffmpeg')
const {Readable} = require('stream')
const fs = require('fs')
const whisper = require('./services/OpenAI/whisper')

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
    client.conversasChatGPT = []
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
                    if (message.type === 'chat') {
                        if (message.content.split(' ').includes('deus')) {
                            await client.reply(message.chatId, 'NÃO SE ESCREVE DEUS COM D MINUSCULO SEU ARROMBADO', message.id)
                        }

                        if (message.content.toLowerCase().split(' ').includes('duvido')) {
                            await client.reply(message.chatId, 'MEU PAU NO SEU OUVIDO', message.id)
                        }

                        if (message.content.startsWith(client.prefix)) {
                            const args = message.content.split(' ')
                            const commandName = args.shift().replace(client.prefix, '').toLowerCase()

                            let command = client.commands.get(commandName)
                            if (command) {
                                if (message.author === client.owner)
                                    client.queue.add(async () => await command.run(client, message, args), {priority: 1})
                                else
                                    client.queue.add(async () => await command.run(client, message, args), {priority: 0})
                            }
                        }
                    } else if (message.type === 'ptt') {
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

    await client.onMessageDeleted(async message => {
        try {
            if (message.from === client.bot) return
            if (message.type === 'image') {
                await zap
                    .decryptMedia(message)
                    .then(async mediaData => {
                        const filename = `${message.t}.${mime.extension(message.mimetype)}`
                        await client.sendImage(message.from, mediaData, filename, `*DEDO DURO!*\n${message.notifyName} apagou a foto`)
                    })
                    .catch(err => console.error(err))
            } else if (message.type === 'video') {
                await zap
                    .decryptMedia(message)
                    .then(async mediaData => {
                        const filename = `${message.t}.${mime.extension(message.mimetype)}`
                        await client.sendFile(message.from, mediaData, filename, `*DEDO DURO!*\n${message.notifyName} apagou o video`)
                    })
                    .catch(err => console.error(err))
            } else if (message.type === 'ptt' || message.type === 'audio') {
                await zap.decryptMedia(message)
                    .then(async mediaData => {
                        const filename = `${message.t}.${mime.extension(message.mimetype)}`
                        await client.sendText(message.from, `*DEDO DURO!*\n${message.notifyName} apagou o audio`)
                        await client.sendFile(message.from, mediaData, filename, `*DEDO DURO!*\n${message.notifyName} apagou o audio`)
                    })
                    .catch(err => console.error(err))
            } else if (message.type === 'document') {
                await zap.decryptMedia(message)
                    .then(async mediaData => {
                        const filename = `${message.t}.${mime.extension(message.mimetype)}`
                        await client.sendFile(message.from, mediaData, filename, `*DEDO DURO!*\n${message.notifyName} apagou o documento`)
                    })
                    .catch(err => console.error(err))
            } else if (message.type === 'sticker') {
                await zap.decryptMedia(message)
                    .then(async mediaData => {
                        await client.sendText(message.from, `*DEDO DURO!*\n${message.notifyName} apagou a figurinha`)
                        await client.sendImageAsSticker(message.from, mediaData)
                    })
                    .catch(err => console.error(err))
            } else if (message.type === 'chat') {
                await client.sendText(message.from, `*DEDO DURO!*\n${message.notifyName} apagou a mensagem: _${message.body}_`)
            }
        } catch (err) {
            console.error(err)
        }
    })
}).catch(err => console.error(err))
