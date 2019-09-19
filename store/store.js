const mongoose = require('mongoose')

const Schema = mongoose.Schema

const storeSchema = new Schema({
    rsi: {
        type: Array
    },
    stoch: {
        type: Array
    },
    macd: {
        type: Array
    }
})

module.exports = mongoose.model('storeSchema', storeSchema)