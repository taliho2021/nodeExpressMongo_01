const cors = require('cors')
const passport = require('passport')
const path = require('path')

/**
 * -------------- GENERAL SETUP ----------------
 */

// Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
require('dotenv').config();

// Must first load the models
require('./models/user');

// Pass the global passport object into the configuration function
require('./config/passport')(passport);

// This will initialize the passport object on every request
app.use(passport.initialize());

// Where Angular builds to - In the ./angular/angular.json file, you will find this configuration
// at the property: projects.angular.architect.build.options.outputPath
// When you run `ng build`, the output will go to the ./public directory
app.use(express.static(path.join(__dirname, 'public')));

/**
 * -------------- ROUTES ----------------
 */

// Imports all of the routes from ./routes/index.js
app.use(require('./routes'));

module.exports = function (req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token')

    // Check if no token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied. Please update your token'})
    }

    // Verify token
    try{
        jwt.verify(token, config.get('jwtSecret'), (error, decoded) => {
            if (error) {
                return res.status(401).json({ msg: 'Token is not valid'})
            } else {
                req.user = decoded.user;
                next()
            }
        })
    } catch (err) {
        console.error ('something wrong with auth middleware');
        res.status(500).json({ msg: 'Server Error'})
    }
}