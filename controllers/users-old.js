const jwt = require('jsonwebtoken')

const User = require('../models/user')

exports.getUsers =(async(req, res, next) =>{
    try {
        const users = await User.find()
        res.json(users)
    } catch(err) {
        res.status(500).json({ message: err.message})
    }
})

exports.getUser = (req, res, next)  =>{
    const cUser = req.params.username

    User.findOne({ username: cUser}, (err, foundUser) => {
        if (foundUser) {
            const token = jwt.sign({id: cUser}, process.env.SECRET, {
                expiresIn: 10000
            })
            res.json(foundUser)       // Send the token to the requester
            console.log(token, foundUser);
        } else {
            res.send("No user matching the username found")
        }
    })


}

exports.addOneUser = (async (req,res, next) =>{
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
  
exports.adminBoard = function(req, res)  {
    res.status(200).send("ANA Link Admin Board");
};
  
exports.moderatorBoard = function (req, res) {
    res.status(200).send("Moderator Contect for ANA Link, Ltd.")
};

exports.login = ((req, res) => {
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
                { email },
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

exports.updateUser = (req, res, next) =>{}