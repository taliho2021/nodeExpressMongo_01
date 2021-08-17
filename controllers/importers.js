const {validationResult } = require('express-validator')
const path = require('path')

const Importer = require('../models/importer')

exports.getImporters = (async(req, res, next) => {
    try {
        const importers = await Importer.find()
        res.json(importers)
     } catch (err) {
     res.status(500).json({ message: err.message})
     }
})

exports.getImporter= (req, res, next ) =>{
        const cid = req.params.clientId
        Importer.findOne({'clientId': cid})
        .then(importer => {
            if (!importer) {
                const error = new Error('Could not find importer')
                error.statusCode = 404
                throw error
            }
            res.status(200).json({message: ' Importer fetched', importer: Importer})
        })
        . catch(err =>{
               if (!err.statusCode) {
                   err.statusCode = 500
               }
               next(err)
            })  
        }

exports.updateImporter = (async (req, res, next) => {
    const clientId = req.params.clientId
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect')
        error.statusCode = 422
        throw error
    }
    const clientid = req.body.clientId
    const name = req.body.name
    const address1 = req.body.address1
    const address2 = req.body.address2
    const city = req.body.city
    const state = req.body.state
    const country = req.body.country
    const phone1 = req.body.phone1
    const website = req.body.website
    const email1 = req.body.email1

    Importer.findById(clientId)
        .then(importer => {
            if (!importer) {
                const error = new Error('Not authorized!')
                error.statusCode = 403
                throw error
            }
            importer.name = name
            importer.address1 = address1
            importer.address2 = address2
            importer.city = city
            importer.state = state
            importer.country = country
            importer.phone1 = phone1
            importer.website = website
            importer.email1 = emnail1
            return importer.save()
        })
        .then(result =>{
            res.status(200).json({message: 'Importer updated', importer: result})
        })
        .catch(err => {
            if (!err.statusCode){
                err.statusCode = 500
            }
            next(err)
        })
    })

// Add a new importer to DB
exports.addImporter = (async (req, res, next ) => {
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
