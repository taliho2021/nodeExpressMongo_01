if (process.env.NODE_ENV !== 'production'){
require('dotenv').config()
}

const express = require('express')
const path = require('path')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const dm = require('./models')

// Add EJS views.  Need to add after const app = express() has been loaded
app.set('view engine', 'ejs')

// Connect Database
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true, 
  useUnifiedTopology: true})

const db = mongoose.connection
const Role = dm.role

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to MongoDB ANA Link Database'))

// const Post = db.model(Post, postSchema)  - Cannot access 'Post' before initialization

// Init Middleware
app.use(express.json())
app.use(cors())

// Take a text password and create a hash

const bcrypt = require("bcryptjs")

const password = "mypass123"
const saltRounds = 10

bcrypt.genSalt(saltRounds, function (saltError, salt) {
  if (saltError) {
    throw saltError
  } else {
    bcrypt.hash(password, salt, function(hashError, hash) {
      if (hashError) {
        throw hashError
      } else {
        console.log(hash)
        //$2a$10$FEBywZh8u9M0Cec/0mWep.1kXrwKeiWDba6tdKvDfEBjyePJnDT7K
      }
    })
  }
})

app.get('/', (req, res) =>{
    let today = new Date()
    res.render('home', {todayDate: today})
})

// Create 3 rows in roles collection 

function initial(){
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: 'user'
      }).save(err => {
        if (err) {
          console.log('error', err)
        }
        console.log("added 'user' to roles collection" )
      })

      new Role({
        name: 'moderator'
      }).save (err => {
        if (err) {
          console.log('error', err)
        }
        console.log("added 'moderator' to roles collection")
      }) 

      new Role({
        name: 'admin'
      }).save (err => {
        if (err) {
          console.log('error', err)
        }
        console.log("added 'admin' to roles collection")
      }) 
      
    }
  })
}

initial()

// Define Routes
// const usersRouter = require('./routes/users')
app.use('/users', require('./routes/users'))
app.use('/auth', require('./routes/auth'))
app.use('/profile', require('./routes/profile'))
app.use('/posts', require('./routes/posts'))
app.use('/importers', require('./routes/importers'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started at localhost: ${PORT}`))