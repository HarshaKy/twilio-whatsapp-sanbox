const twilio = require('twilio')
const { accountSid, authToken } = require('./keys.js')

const client = new twilio(accountSid, authToken)

const sendTextMessage = (to, text) => {
    return new Promise((resolve, reject) => {
        client.messages.create({
            body: text,
            to: to,
            from: 'whatsapp:+14155238886'
        })
        .then(message => resolve(message.sid))
        .catch(err => reject(err))
    })
}

const sendMediaMessage = (to, url) => {
    return new Promise((resolve, reject) => {
        client.messages.create({
            mediaUrl: url,
            to: to,
            from: 'whatsapp:+14155238886'
        })
        .then(message => resolve(message.sid))
        .catch(err => reject(err))
    })
}

module.exports = { sendTextMessage, sendMediaMessage }