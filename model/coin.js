const mongoose = require('mongoose')

const Schema = mongoose.Schema

const coin = new Schema({
    name: {
        type: String
    },
    hi: {
        type: Number
    }
})

module.exports = mongoose.model('coin', coin)