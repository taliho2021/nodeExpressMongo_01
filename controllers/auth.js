const jwt = require("jsonwebtoken");
const  utils = require ('../lib/utils');

const User = require('../models/user');


exports.signup = (req, res) => {

  const saltHash = utils.genPassword(req.body.password);
    
  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newUser = new User({
      username: req.body.username,
      hash: hash,
      salt: salt
  });

  try {
  
      newUser.save()
          .then((user) => {
              res.json({ success: true, user: user });
          });

  } catch (err) {
      
      res.json({ success: false, msg: err });
  
  }

};

exports.signin = (req, res, next) => {
  
  User.findOne({ username: req.body.username })
        .then((user) => {

            if (!user) {
                return res.status(401).json({ success: false, msg: "could not find user" });
            }
            
            // Function defined at bottom of app.js
            const isValid = utils.validPassword(req.body.password, user.hash, user.salt);
            
            if (isValid) {

                const tokenObject = utils.issueJWT(user);

                res.status(200).json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires });

            } else {

                res.status(401).json({ success: false, msg: "you entered the wrong password" });

            }

        })
        .catch((err) => {
            next(err);
        });
};