const express = require('express')
const router = express.Router()
const User = require('../models/User')
const userController = require('../controllers/users')

router.get('/', userController.getUsers)

router.get('/:username', userController.getUser)

// // Gettting all users.  MOVED all logic to controllers.user file
// router.get('/', async (req, res) => {
//     try {
//        const users = await User.find()
//        res.json(users)
//     } catch (err) {
//     res.status(500).json({ message: err.message})
//     }
// })

// //Getting one user
// router.get('/:id', (req, res) => {
//     res.send('Get all user route')

// })
//Creating user
router.post('/', async(req, res) => {
    const user = new User({
       name: req.body.name,
       username: req.body.username,
       email: req.body.email,
       password: req.body.password,
       roles: req.body.roles,
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

router.post('/register', async(req, res) => {

    // Register logic starts here
    try{
        // Get user input
        const { name, username, email, password } = rer.body

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
             {user_id: user_id, email },
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

router.post('/login', async(req, res) =>{
    // Login logic starts here
    try {
        // Get user input
        const { email, password } = req.body

        // Validate user input
        if (!(email && password)) {
            res.status(400).send('All input is required')
        }

        // Validate if user exist in DB
        const user = await User.findOne({ email })

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                { user_id: user_id, email},
                process.env.TOKEN_KEY,
                {
                    expiresIn: '2h',
                }
            )

            // save user token
            user.token = token

            //user
            res.status(200).json(user)
        }
        res.status(400).send('Invalid Credential')
    } catch (err) {
        console.log(err);
    }
})


module.exports = router