module.exports = {
    name: 'infos',
    descricao: 'Mostra informações importantes sobre o BOT',
    showInHelp: true,
    run: async function (client, message, args) {
        try {
            let msg = `*Informações importantes sobre o BOT Tchola*\n\n*- Privacidade:*\n_As mensagens recebidas pelo BOT em grupos ou no privado são limpas todos os dias, ou seja, nada fica armazenado._\n\n*- Execução de comandos:*\n_O BOT processa 10 mensagens por vez, ou seja, seu comando ou transcrição de audio podem demorar até 1 minuto, além disso, pode ter ocorrido um erro no comando._\n\n*- Erros:*\n_Erros podem ocorrer na execução de algum comando, porém são automaticamente reportados para o desenvolvedor. Se caso ocorrer, peço desculpas, estou em constante melhora todos os dias._\n\n*- Contato com o desenvolvedor:*\n_Para entrar em contato com o desenvolvedor, utilize o comando "!dev" ou siga o mesmo no Instagram ("!creditos")._`

            await client.sendText(message.chatId, msg)
        } catch (err) {
            console.error(err)
        }
    }
}