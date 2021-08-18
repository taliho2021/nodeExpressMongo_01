const express = require('express')
const router = express.Router()
const { body } =require('express-validator')
const Importer = require('../models/importer')
const isAuth = require('../middleware/is-auth')
const importController = require('../controllers/importers')
const importer = require('../models/importer')

// Gettting all importers
router.get('/',importController.getImporters)

//Creating importer
router.post('/', importController.addImporter)

// Getting ONE importer

router.get('/:clientId', importController.getImporter)

// Update an importer with clientId
router.put('/:clientId', importController.updateImporter)

module.exports = router



