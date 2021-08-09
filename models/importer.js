const mongoose = require('mongoose')

const importerSchema = new mongoose.Schema({
    clientId: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    address1: {
      type: String
    },
    address2: {
        type: String
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    phone1: {
        type: Number
    },
    phone2: {
        type: Number
    },
    website: {
        type: String
    },
    email1: {
        type: String
    }
})

module.exports = mongoose.model('Importer', importerSchema, 'importers')