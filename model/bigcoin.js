const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bigcoin = new Schema({
    timet2h: {
        type : String
    },
    timet4h: {
        type: String
    },
    timet1d: {
        type: String
    },
    timet1w: {
        type: String
    },
    t2h: {
        type: Array,
        default: ['BTCUSDT']
    },
    t4h: {
        type: Array,
        default: ['BTCUSDT']
    },
    t1d: {
        type: Array,
        default: ['BTCUSDT']
    },
    t1w: {
        type: Array,
        default: ['BTCUSDT']
    },
    mymyid: {
        type: String,
        default: 'bigcoin'
    },

}, { strict: false })

module.exports = mongoose.model('bigcoin', bigcoin)