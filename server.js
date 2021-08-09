require('dotenv').config()

const express = require('express')
const path = require('path')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

// Add EJS views.  Need to add after const app = express() has been loaded
app.set('view engine', 'ejs')

// Connect Database
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to MongoDB Database'))

// const Post = db.model(Post, postSchema)  - Cannot access 'Post' before initialization

// Init Middleware
app.use(express.json())

// Add below to prevent CORS error - Commented out and added CORS package
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*')
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
//   res.setHeader('Access-Contorl-Allow-Headers', 'Content-Type, Authorization')
//   next()
// })
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

// Define Routes
// const usersRouter = require('./routes/users')
app.use('/users', require('./routes/users'))
app.use('/auth', require('./routes/auth'))
app.use('/profile', require('./routes/profile'))
app.use('/posts', require('./routes/posts'))
app.use('/importers', require('./routes/importers'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started at localhost: ${PORT}`))