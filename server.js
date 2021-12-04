if (process.env.NODE_ENV !== 'production'){
require('dotenv').config()
}

const express = require('express')
const path = require('path')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const dm = require('./models')
const session = require('express-session')

const MongoStore = require('connect-mongo')(session)

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

// Initial global Middlewares
app.use(express.json())
app.use(cors())

<<<<<<< HEAD
const sessionStore = new MongoStore({
  mongooseConnection: mongoose.connection,
  collecton: 'sessions'
})

app.use(session({
  secret: 'some secret',
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }
}))
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
=======
>>>>>>> e6cca6980f49ed3ae7040b59c62bc6761f6753b6

app.get('/', (req, res) =>{
    let today = new Date()
    res.render('home', {todayDate: today})
})


// Define Routes
app.use('/users', require('./routes/users'))
app.use('/auth', require('./routes/auth'))
app.use('/profile', require('./routes/profile'))
app.use('/posts', require('./routes/posts'))
app.use('/importers', require('./routes/importers'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started at localhost: ${PORT}`))