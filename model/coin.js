const mongoose = require('mongoose')

const Schema = mongoose.Schema

const coin = new Schema({
    // candles:{
    //     type: Object
    // },
    t5m: {
        type: Array,
        default: ['BTCUSDT']
    },
    t15m: {
        type: Array,
        default: ['BTCUSDT']
    },
    t1h: {
        type: Array,
        default: ['BTCUSDT']
    },
    t1w: {
        type: Array,
        default: ['BTCUSDT']
    },
    mymyid: {
        type: String,
        default: '12345'
    }
})

module.exports = mongoose.model('coin', coin)