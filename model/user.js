const mongoose = require('mongoose')

const Schema = mongoose.Schema
const user = new Schema({
    username: {
        type: String
    },
    time: {
        type: Number,
        default: Date.now()
    },
    hasAccess: {
        type: Boolean,
        default: true
    },
    paid: {
        type: Array
    }
})

module.exports = mongoose.model('user', user)