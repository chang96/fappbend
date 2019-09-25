const mongoose = require('mongoose')

const Schema = mongoose.Schema

const coin = new Schema({
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
    _id: {
        type: String,
        default: '12345'
    }
})

module.exports = mongoose.model('coin', coin)