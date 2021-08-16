const jwt = require('jsonwebtoken');

const config = process.env

const verifyToken = (req, res, next) => {
  const token = 
    req.bodytoken || req.query.token || req.header['x-access-token']

  if (!token) {
    return res.status(403).send('A token is required for authentication')
  }
  try{
    const decoded = jwt.verify(token, config.TOKEN_KEY)
    req.user = decoded
  } catch(err){
    return res.status(401).send('Invalid Token')
  }

  return next()
}

module.exports = verifyToken

// module.exports = (req, res, next) => {
//   const authHeader = req.get('Authorization');
//   if (!authHeader) {
//     const error = new Error('Not authenticated.');
//     error.statusCode = 401;
//     throw error;
//   }
//   const token = authHeader.split(' ')[1];
//   let decodedToken;
//   try {
//     decodedToken = jwt.verify(token, 'somesupersecretsecret');
//   } catch (err) {
//     err.statusCode = 500;
//     throw err;
//   }
//   if (!decodedToken) {
//     const error = new Error('Not authenticated.');
//     error.statusCode = 401;
//     throw error;
//   }
//   req.userId = decodedToken.userId;
//   next();
// };
