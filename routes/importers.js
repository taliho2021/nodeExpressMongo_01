const express = require('express')
const router = express.Router()
const Importer = require('../models/importer')

// Getttin all importers
router.get('/', async (req, res) => {
    try {
       const importers = await Importer.find()
       res.json(importers)
    } catch (err) {
    res.status(500).json({ message: err.message})
    }
})

//Creating a new importer
router.post('/', async(req, res) => {
    const importer = new Importer({
       clientId: req.body.clientId,
       name: req.body.name,
       address1: req.body.address1,
       address2: req.body.address2,
       city: req.body.city,
       state: req.body.state,
       country: req.body.country,
       phone1: req.body.phone1,
       website: req.body.website,
       email1: req.body.email1
    })
    try{
      const newImporter = await importer.save()
      console.log('Saved the imporeter to DB', newImporter)
      res.status(201).json(newImporter)
    } catch (err) {
        res.status(400).json({message: err.message})

    }
})

module.exports = router