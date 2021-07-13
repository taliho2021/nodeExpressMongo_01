const express = require('express')
const router = express.Router()
const User = require('../models/User')

// Getttin all users
router.get('/', async (req, res) => {
    try {
       const users = await User.find()
       res.json(users)
    } catch (err) {
    res.status(500).json({ message: err.message})
    }
})

//Getting one user
router.get('/:id', (req, res) => {
    res.send('Get all user route')

})
//Creating user
router.post('/', async(req, res) => {
    const user = new User({
       name: req.body.name,
       username: req.body.username,
       email: req.body.email,
       password: req.body.password,
       date: new Date()
    })
    try{
      const newUser = await user.save()
      console.log('Saved user to DB', newUser)
      res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json({message: err.message})

    }
})
//Updating one
router.patch('/:id', (req, res) => {
     res.send('Patch route works')
})
// Deleting one
router.delete('/:id', (req, res) => {
     res.send('Delete route works')
})
module.exports = router