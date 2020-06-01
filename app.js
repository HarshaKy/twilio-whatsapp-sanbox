const express = require('express')
const twilio = require('twilio')

const app = express()

const accountSid = 'AC35160db59eb5991f3c3c835b965d13a2';
const authToken = 'a40dd2631130e56b0a32ce4449e6c9c0';
const client = require('twilio')(accountSid, authToken);



app.get('/', (req, res) => {
    client.messages
      .create({
         from: 'whatsapp:+14155238886',
         body: 'Hey, I just met you, and this is crazy...',
         statusCallback: 'http://postb.in/1234abcd',
         to: 'whatsapp:+918971677453'
       })
      .then(message => console.log(message.sid));
    res.send('Hello World!')
})

app.listen(3000, () => {
    console.log('Listening on port 3000')
})