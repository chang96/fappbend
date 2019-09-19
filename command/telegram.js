require('dotenv').config()
const telegram = require('telegram-bot-api');
const token = '935256153:AAEpl7pwiov2O228UzGt9N2t6ZoEJWa-lsc' //process.env.TELE_BOT
const api = new telegram({
    token: token,
    updates: {
        enabled: true
    }
});

api.on('message', function(message) {
    // Received text message
    console.log(message);
});
module.exports.sending = async function(text) {
        let a = await text
        api.sendMessage({
            chat_id: 307237218,
            text: a
        })
    }
    //console.log('starting....')