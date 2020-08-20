const fs = require('fs')
const { sendTextMessage, sendMediaMessage } = require('./whatsapp')

const handleWhatsappResponse = async (message, context, userNumber) => {
    console.log('context', context)

    if (['Hi', 'hi'].includes(message)) {
        sendTextMessage(userNumber, 'Hello there')
        setContext('sadihi')
    }
}

const setContext = (context) => {
    let json = JSON.stringify({ "context": context })
    fs.writeFile('context.json', json, () => {
        console.log('wrote to json')
    })
}

module.exports = { handleWhatsappResponse }