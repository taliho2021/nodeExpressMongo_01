// 4 functions for access  
const User = require('../models/user')

exports.allUsers = (async (req, res, next) => {
    try{
        const users = await User.find()
        res.json(users)
    }   catch(err){
        res.status(500).json({ message: err.message})
    }
})
  
exports.getUser = (req, res, next) => {
    const cUser = req.params.username

    User.findOne({username : cUser}, (err, foundUser) => {
        if (foundUser) {
            res.json(foundUser)
        } else {
            res.send('No user with the username:', User)
        }
    });
}
  
exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};
  
exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};