const zap = require("@open-wa/wa-automate");
const fs = require("fs");
const path = require("path");
const {Readable} = require("stream");
const ffmpeg = require("fluent-ffmpeg");
const whisper = require("../services/OpenAI/whisper");

const emojis = ['🤫', '🤭', '😈', '🐒', '🐵', '🦧', '🤬', '😱', '🥵', '💩', '☠️']

module.exports = async function (client, message) {
    try {
        if (message.author === '554488471531@c.us') {
            const randomIndex = Math.floor(Math.random() * emojis.length)
            const randomEmoji = emojis[randomIndex]

            await client.react(message.id, randomEmoji)
        }

        await client.sendSeen(message.chatId)
        if (message.text) {
            if (message.text.split(' ').includes('deus')) {
                await client.reply(message.chatId, 'NÃO SE ESCREVE DEUS COM D MINUSCULO SEU ARROMBADO', message.id)
            }

            if (message.text.toLowerCase().split(' ').includes('duvido')) {
                await client.reply(message.chatId, 'MEU PAU NO SEU OUVIDO', message.id)
            }

            if (message.text.toLowerCase().split(' ').includes('atenção') || message.text.toLowerCase().split(' ').includes('atencao')) {
                await client.reply(message.chatId, 'MEU PAU NA SUA MÃO', message.id)
            }

            if (message.text.startsWith(client.prefix)) {
                const args = message.text.split(' ')
                const commandName = args.shift().replace(client.prefix, '').toLowerCase()

                let command = client.commands.get(commandName)
                if (command) {
                    await command.run(client, message, args)
                }
            }
        }

        if (message.type === 'ptt') {
            try {
                if (process.env.OPENAI_API_KEY) {
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
                                    await fs.unlinkSync(filePath)
                                })
                        })
                }
            } catch (err) {
             console.error(err)
            }
        }
    } catch (err) {
        console.error(err)
    }
}