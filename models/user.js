const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    date: Date,
})

//hash the password
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

// checking is password is valild
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.passowrd)
}

module.exports= mongoose.model('User', userSchema)