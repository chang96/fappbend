const mongoose = require('mongoose')

const Schema = mongoose.Schema

const purecoin = new Schema({
    
    timept5m: {
        type: String
    },
    timept15m: {
        type: String
    },
    timept30m: {
        type: String
    },
    timept1h: {
        type: String
    },
    pt5m: {
        type: Array,
        default: ['BTCUSDT']
    },
    pt15m: {
        type: Array,
        default: ['BTCUSDT']
    },
    pt30m: {
        type: Array,
        default: ['BTCUSDT']
    },
    pt1h: {
        type: Array,
        default: ['BTCUSDT']
    },
    mymyid: {
        type: String,
        default: 'purecoin'
    },

}, { strict: false })

module.exports = mongoose.model('purecoin', purecoin)