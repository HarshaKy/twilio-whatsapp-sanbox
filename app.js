const express = require('express')
const twilio = require('twilio')
const { MessagingResponse } = require('twilio').twiml
const { accountSid, authToken } = require('./keys.js')
const bodyParser = require('body-parser')
const { handleWhatsappResponse } = require('./handleResponse')
const fs = require('fs')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))

const client = require('twilio')(accountSid, authToken)

app.post('/message', (req, res) => {
	fs.readFile('context.json', (err, data) => {
		let contextJson = JSON.parse(data)
		let context = contextJson.context
		handleWhatsappResponse(req.body.Body, context, req.body.From)
	})
})


app.listen(3000, () => {
		console.log('Listening on port 3000')
})