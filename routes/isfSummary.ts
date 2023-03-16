import express from 'express'
const router = express.Router()
const isfSummaryController = require('../controllers/isfSummaryF')

router.get('/', isfSummaryController.getAllIsfSummaries)

router.get('/:id', isfSummaryController.getIsfSummaryById)

router.put('/:id', isfSummaryController.updateIsfSummaryById)
// Update an importer with clientId
router.delete('/:id', isfSummaryController.deleteIsfSummaryById)



module.exports = router



