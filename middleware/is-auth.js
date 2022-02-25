const jwt = require('jsonwebtoken');

const User = require('../models/User')
const Role = require('../models/role')

// Check if the token from the HTTP request is valid

const verifyToken = (req, res, next) => {
  const token = 
    req.bodytoken || req.query.token || req.header['x-access-token']

  if (!token) {
    return res.status(403).send('A token is required for authentication')
  }

jwt.verify(token, process.env.SECRET, (err, decoded) => {
  if (err) {
    return res.status(401).send({message: 'Unauthorized!'})
  }
  req.userId = decoded.id;
})
  
  return next()
}

// Check if the user is admin and return a boolean value
isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Admin Role!" });
        return;
      }
    );
  });
};

// Check if the user is a moderator and return a boolean valu

isModerator = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "moderator") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Moderator Role!" });
        return;
      }
    );
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator
};
module.exports = authJwt;


