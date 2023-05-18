import  express  from 'express'
const path = require('path')
const passport = require('passport')
const cors = require('cors')

require('dotenv').config()

const app = express()

require('./config/database')

app.set('view engine', 'ejs')

require('./models/user')
require('./models/importer')

require('./config/passport')(passport);

app.use(passport.initialize())

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.use(cors())

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) =>{   

    let today = new Date()

    let options = {
      weekday: "long",
      day: "numeric",
      month: "long"
    }

    let day = today.toLocaleDateString("en-us")

    res.render('home', {todayDate: day})
})

app.get('/about', (res) =>{
  let today = new Date()
  res.render('about', {todayDate: today})
})

app.get('/customers', (res) =>{
  res.render('customers')
})

app.get('/dashboard', (res) =>{
  res.render('dashboard')
})





// Define Routes - 5 routes
app.use('/users', require('./routes/users'))
app.use('/auth', require('./routes/auth'))
app.use('/posts', require('./routes/posts'))
// app.use('/importers', require('./routes/importers'))
// app.use('/isfSummary', require('./routes/isfSummary'))


app.listen(process.env.PORT || 8000 )

<<<<<<< HEAD:server.js
=======
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
>>>>>>> 8a99a38784ca770d248781ba67616cbbcb7d7b2e:server.ts
