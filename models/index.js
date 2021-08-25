const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const dm = {}

dm.role = require('./role')

dm.ROLES = ['user', 'admin', 'moderator']

module.exports = dm
