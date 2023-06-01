const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    id: {
        type: String
    },
    qtdeMensagens: {
        type: Number
    },
    banido: {
        type: Boolean
    }
})

module.exports = mongoose.model('Users', userSchema)