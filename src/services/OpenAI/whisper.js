const axios = require('axios')
const formData = require('form-data')

module.exports = async function (file) {
    return new Promise(async function (resolve, reject) {
        try {
            const form = new formData()
            form.append('file', file)
            form.append('model', 'whisper-1')

            const headers = {
                Authorization: 'Bearer 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'
            }

            axios
                .post('https://api.openai.com/v1/audio/transcriptions', form, {headers: headers})
                .then(response => resolve(response.data))
                .catch(err => reject(err))
        } catch (err) {

        }
    })
}