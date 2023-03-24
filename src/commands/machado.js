module.exports = {
    name: 'machado',
    descricao: 'Explica o que é API',
    showInHelp: false,
    run: async function (client, message, args) {
        try {
            await client.sendText(message.chatId, 'API (Application Programming Interface) é um conjunto de regras, protocolos e ferramentas para construir e integrar software. Ela define a maneira como um software interage com outro software ou hardware, permitindo que desenvolvedores possam criar aplicativos e serviços que se conectam a outros sistemas.\n\nPresente professor, Felipe Gabriel')
        } catch (err) {
            console.error(err)
        }
    }
}