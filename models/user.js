const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    date: Date,
})

module.exports= mongoose.model('User', userSchema)