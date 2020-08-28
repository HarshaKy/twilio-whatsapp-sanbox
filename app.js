const express = require('express')
const twilio = require('twilio')
const path = require('path')
const { MessagingResponse } = require('twilio').twiml
const { accountSid, authToken } = require('./keys.js')
const bodyParser = require('body-parser')
const { handleWhatsappResponse, sendNotification } = require('./handleResponse')
const fs = require('fs')
const { send } = require('process')

const publicDirPath = path.join(__dirname, 'public')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(publicDirPath))

const client = require('twilio')(accountSid, authToken)

app.post('/message', (req, res) => {
	fs.readFile('context.json', (err, data) => {
		let contextJson = JSON.parse(data)
		let context = contextJson.context
		let address = contextJson.address
		handleWhatsappResponse(req.body.Body, context, req.body.From, address)
	})

	res.status(200).send('ok')
})

app.get('/notification', (req, res) => {
	// sendNotification('The order 2x *Pedigree Adult Dry Dog Food, Chicken & Steak* has been dispatched from our shop centre.', 'whatsapp:+919902132958')
	// sendNotification('The order 2x *Pedigree Adult Dry Dog Food, Chicken & Steak* will be delivered to you in 30 minutes.', 'whatsapp:+919902132958')
	// sendNotification('The order has been successfully delivered. Thank you for shopping with us.\n\nYou can order from us again by typing *hello* to view our pet categories.', 'whatsapp:+919902132958')
	handleWhatsappResponse('cart abandoned', 'cartAbandoned', 'whatsapp:+919902132958', '')
	
	res.send('notified')
})


app.listen(3000, () => {
		console.log('Listening on port 3000')
})