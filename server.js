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