const express = require('express')
const path = require('path')
const passport = require('passport')
const cors = require('cors')

/**
 * --------- GENERAL SETUP ------------
 */

// Gives access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
require('dotenv').config()

// Create the Express application
const app = express()

// Configure the database and opens a global connection that can be used in any module with `mongoose.connection`
require('./config/database')

// Add EJS views.  Need to add after const app = express() has been loaded
app.set('view engine', 'ejs')

// Must first load the models
require('./models/user')
require('./models/importer')

// Pass the global passport object into the configuration function - Added on 2/25/22
require('./config/passport')(passport);

// This will initialize the passport object on every request
app.use(passport.initialize())


// Initialize  global middleware, instead of using body-parser middleware, use the new Express implementation of the same thing.
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

//Allows Angular applicaitons to make HTTp reuests to Express applicaiton
app.use(cors())

// Where Angular builds to - In the ./angular/angular.json file, you will find this configuration
// at the property: projects.angular.architect.build.options.outputPath
// When you run `ng build`, the output will go to the ./public directory
app.use(express.static(path.join(__dirname, 'public')))


// Home route
app.get('/', (req, res) =>{
    let today = new Date()
    res.render('home', {todayDate: today})
})

app.get('/about', (req, res) =>{
  let today = new Date()
  res.render('about', {todayDate: today})
})

app.get('/customers', (req, res) =>{
  res.render('customers')
})





// Define Routes - 4 routes
app.use('/users', require('./routes/users'))
app.use('/auth', require('./routes/auth'))
app.use('/posts', require('./routes/posts'))
app.use('/importers', require('./routes/importers'))

let PORT = process.env.PORT 

if (PORT == null || PORT == "") {
  PORT = 8000
}
app.listen(PORT, () => console.log(`Server started at localhost: ${PORT}`))

// function initial() {
//     Role.estimatedDocumentCount((err, count) => {
//       if (!err && count === 0) {
//         new Role({
//           name: "user"
//         }).save(err => {
//           if (err) {
//             console.log("error", err);
//           }
  
//           console.log("added 'user' to roles collection");
//         });
  
//         new Role({
//           name: "moderator"
//         }).save(err => {
//           if (err) {
//             console.log("error", err);
//           }
  
//           console.log("added 'moderator' to roles collection");
//         });
  
//         new Role({
//           name: "admin"
//         }).save(err => {
//           if (err) {
//             console.log("error", err);
//           }
  
//           console.log("added 'admin' to roles collection");
//         });
//       }
//     });
//   }