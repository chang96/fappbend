const mongoose = require('mongoose')

const Schema = mongoose.Schema

const coin = new Schema({
    // candles:{
    //     type: Object
    // },
    // t5m: {
    //     type: Array,
    //     default: ['BTCUSDT']
    // },
    timet15m: {
        type: String
    },
    timet1h: {
        type: String
    },
    timet4h: {
        type: String
    },
    t15m: {
        type: Array,
        default: ['BTCUSDT']
    },
    t1h: {
        type: Array,
        default: ['BTCUSDT']
    },
    t4h: {
        type: Array,
        default: ['BTCUSDT']
    },
    mymyid: {
        type: String,
        default: 'string'
    },

}, { strict: false })

module.exports = mongoose.model('coin', coin)