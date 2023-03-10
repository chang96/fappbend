const mongoose = require('mongoose')

const Schema = mongoose.Schema

const coin = new Schema({
    timet1m: {
        type: String
    },
    timet3m: {
        type: String
    },
    timet5m: {
        type: String
    },
    timet15m: {
        type: String
    },
    timet30m: {
        type: String
    },
    timet1h: {
        type: String
    },
    t1m: {
        type: Array,
        default: ['BTCUSDT']
    },
    t3m: {
        type: Array,
        default: ['BTCUSDT']
    },
    t5m: {
        type: Array,
        default: ['BTCUSDT']
    },
    t15m: {
        type: Array,
        default: ['BTCUSDT']
    },
    t30m: {
        type: Array,
        default: ['BTCUSDT']
    },
    t1h: {
        type: Array,
        default: ['BTCUSDT']
    },
    mymyid: {
        type: String,
        default: 'string'
    },

}, { strict: false })

module.exports = mongoose.model('coin', coin)