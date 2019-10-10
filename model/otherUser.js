const mongoose = require('mongoose')

const Schema = mongoose.Schema
const otherUser = new Schema({
    username: {
        type: String
    },
    date: {
        type: String
    }
})

module.exports = mongoose.model('otherUser', otherUser)