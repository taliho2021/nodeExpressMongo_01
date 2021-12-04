const {validationResult } = require('express-validator')
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
            res.json(token)       // Send the token to the requester
            console.log(token);
        } else {
            res.send("No user matching the username found")
        }
    })

    
    // res.status(200).json({ tokne: token, cUser})   Cannot set headers after they are sent to the client

}

  
exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};
  
exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};



exports.updateUser = (req, res, netxt) =>{}