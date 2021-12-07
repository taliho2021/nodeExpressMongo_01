const express = require('express')
const router = express.Router()
const userController = require('../controllers/users')

const jwt = require('jsonwebtoken')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

// Get all users
router.get('/', userController.getUsers)

router.get('/admin', userController.adminBoard)
router.get('/moderator', userController.moderatorBoard)

// Get one user  (All logic moved to controller.)
router.get('/:username', userController.getUser)

//Creating user - Logic should be moved to controllers/users
router.post('/', userController.addOneUser)

//Updating one
router.patch('/:id', (req, res) => {
     res.send('Patch route works')
})

// Deleting one
router.delete('/:id', (req, res) => {
     res.send('Delete route works')
})

router.post('/register', async(req, res) => {

    // Register logic starts here
    try{
        // Get user input
        const { name, username, email, password } = req.body

        // Validate user input
        if (!(name && username && email && pawword)) {
            res.status(400).send('All input is required')
        }

        // Check if user already exist
        // Validate if user exist in DB
        const oldUser = await User.findOne({email})

        if (oldUser) {
            return res.status(409).send('User Already Exist. Please Login')
        }

        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10)

        //Create user in DB
        const user = await User.create({
            name,
            username,
            email: email.toLowerCase(),
            password: encryptedPassword
        })

        // Create token
        const token = jwt.sign(
             {id: id, email },
             process.env.TOKEN_KEY, 
             {
                 expiresIn: '2h',
             }
        )
        // save user token
        user.token = token

        // return new user
        res.status(201).json(user)
    } catch (err){
        console.log(err);
    }
})

router.post('/login', (req, res) =>{
    // Login logic starts here
    
        // Get user input
        const email = req.body.email
        const password = req.body.password
        //console.log(email, password)
        console.log(req.body.email, req.body.password)
        // Validate user input
        if (!(email && password)) {
            res.status(400).send('Email & Password are required')
        }

        // Validate if user exist in DB
        const user = User.findOne({ email })

        if (user && (bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                { email},
                process.env.TOKEN_KEY,
                {
                    expiresIn: '2h',
                }
            )

            // save user token
            user.token = token

            //user
            res.status(200).json(user)
            console.log(token, user.token)
            return
        }

    }
)


module.exports = router;