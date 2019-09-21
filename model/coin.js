const mongoose = require('mongoose')

const Schema = mongoose.Schema

const coin = new Schema({
    coins: {
        type: Array
    },
    _id: {
        type: String,
        default: '12345'
    }
})

module.exports = mongoose.model('coin', coin)