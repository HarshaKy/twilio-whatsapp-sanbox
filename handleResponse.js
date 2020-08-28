const fs = require('fs')
const { sendTextMessage, sendMediaMessage } = require('./whatsapp')
const { send } = require('process')

const handleWhatsappResponse = async (message, context, userNumber, address) => {
    console.log('context', context)

    if (['Hi', 'hi', 'hello', 'Hello'].includes(message)) {
        await sendTextMessage(userNumber, 'Greetings! Welcome to Will’s pet store🐶')
        await sendTextMessage(userNumber, 'To buy something, simply type a category name, item name or send a voice message 💬 in English or Arabic. \nYou can also click the below link to order.\n\nType "h" for help.')
        await sendMediaMessage(userNumber, 'https://01baf7e20b98.ngrok.io/cat.png')
        
        setTimeout(async () => {
            await sendTextMessage(userNumber, 'Select a category by typing in the number from the above image(s) ⬆️')
        }, 4000)

        setContext('pickCategory')
    }
    else if(context == 'pickCategory') {
        await sendTextMessage(userNumber, 'These subcategories match your query.')
        await sendMediaMessage(userNumber, 'https://01baf7e20b98.ngrok.io/subcat.jpg')

        setTimeout(async () => {
            await sendTextMessage(userNumber, 'Select the sub-category by typing in the number from the above image(s) ⬆️')
        }, 4000)
        
        setContext('pickSubcategory')
    }
    else if(context == 'pickSubcategory') {
        await sendTextMessage(userNumber, 'These products match your query.')
        await sendMediaMessage(userNumber, 'https://01baf7e20b98.ngrok.io/prod.png')

        setTimeout(async () => {
            await sendTextMessage(userNumber, 'Select a product by typing in the number from the above image(s) ⬆️')
        }, 4000)
        
        setContext('pickProduct')
    }
    else if(context == 'pickProduct') {
        await sendTextMessage(userNumber, 'We found the following variants for *Pedigree Adult Dry Dog Food, Chicken & Steak*\n\n1. *Pedigree Adult Dry Dog Food, Chicken & Steak* 1pcs @ Price: $9.99\n\nTo add the product to cart 🛒, type the number next to the product along with quantity. (Example: 1-2, meaning 2 quantity of variant 1)')
        setContext('addToCart')
    }
    else if(context == 'addToCart') {
        await sendTextMessage(userNumber, '1. 2x *Pedigree Adult Dry Dog Food, Chicken & Steak* 1pcs @ $9.99\n\nTotal = $19.98\n\nThe above items are in your cart 🛒\n\nTo remove an item from your cart 🛒, type the number next to the item followed by R. (Example: 1,R)\n\nTo place an order for these items, type C.\n\nTo add an item, type an item name or type categories.\n\nYou can also cancel ❌ the process by typing Cancel.')
        setContext('askAddress')
    }
    else if(context == 'askAddress') {
        await sendTextMessage(userNumber, 'Enter your address.\nFor ex: Building 🏤 name and flat number 🔢 or \nStreet name and house 🏠 number 🔢')
        setContext('askNameAndContactNumber')
    } 
    else if(context == 'askNameAndContactNumber') {
        await sendTextMessage(userNumber, 'Please share your name and contact number')
        setContext('orderConfirmation', message)
    }
    else if(context == 'orderConfirmation') {
        setContext('placeOrder')
        await sendTextMessage(userNumber, 'Are you sure you want to place an order for these items?\n\n1. 2x *Pedigree Adult Dry Dog Food, Chicken & Steak* 1pcs @ $9.99\n\nTotal = $19.98\n\nThe items will be delivered to this address:\n\n' + address + '\n\nType yes or y to confirm, no or n to cancel.')
    }
    else if(context == 'placeOrder') {
        setContext(false)
        await sendTextMessage(userNumber, '1. 2x *Pedigree Adult Dry Dog Food, Chicken & Steak* 1pcs @ $9.99\n\nTotal = $19.98\n\nYour order for the above items has been placed successfully ✔️. \nWe will deliver it within 1 business day ⏱️.\nYou will be notified once your order is dispatched 🚚.')
    }
    else if(context == 'cartAbandoned') {
        setContext('placeOrder')
        await sendTextMessage(userNumber, 'Hello, your items 2x *Pedigree Adult Dry Dog Food, Chicken & Steak* 1pcs @ $9.99 is still in your cart.\n\nTotal = $19.98\n\nPlease type yes or y to confirm, no or n to cancel.')
    }
}

const sendNotification = async (notification, userNumber) => {
    await sendTextMessage(userNumber, notification)
}

const setContext = (context, address) => {
    let data = {
        context: context,
        address: address ? address : false
    }
    let json = JSON.stringify(data)
    fs.writeFile('context.json', json, () => {
        console.log('wrote to json')
    })
}

module.exports = { handleWhatsappResponse, sendNotification }