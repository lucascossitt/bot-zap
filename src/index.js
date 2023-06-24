const zap = require('@open-wa/wa-automate')
const commandHandler = require('./utils/commandHandler')
const crons = require('./utils/crons')
const messageDeletedEvent = require('./events/messageDeleted')
const messageEvent = require('./events/message')

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
    client.countAndre = 1
    client.owner = '554498561224@c.us'
    client.grupoTcholes = '120363021769457254@g.us'
    client.bot = '554488441949@c.us'
    client.queue = new PQueue({
        concurrency: 2,
        autoStart: false
    })

    await commandHandler(client)
        .then(async () => {
            await client.queue.start()
            await crons(client)
            await client.onMessage(async message => await client.queue.add(async () => await messageEvent(client, message)))
            await client.onMessageDeleted(async message => await client.queue.add(async () => await messageDeletedEvent(client, message)))
        })
        .catch(err => console.error(err))
}).catch(err => console.error(err))
