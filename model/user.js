const mongoose = require('mongoose')

const Schema = mongoose.Schema
const user = new Schema({
    username: {
        type: String
    },
    Time: {
        type: Date,
        default: Date.now()
    },
    hasAccess: {
        type: Boolean
    },
    paid: {
        type: Number
    }
})

module.exports = mongoose.model('user', user)