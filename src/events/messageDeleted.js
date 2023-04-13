const zap = require("@open-wa/wa-automate");
const mime = require("mime-types");
module.exports = async function (client, message) {
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
}