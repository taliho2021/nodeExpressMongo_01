const express = require('express')
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

    let day = today.toLocaleDateString("en-us", options)

    res.render('home', {todayDate: day})
})

app.get('/about', (req, res) =>{
  let today = new Date()
  res.render('about', {todayDate: today})
})

app.get('/customers', (req, res) =>{
  res.render('customers')
})

app.get('/dashboard', (req, res) =>{
  res.render('dashboard')
})





// Define Routes - 4 routes
app.use('/users', require('./routes/users'))
app.use('/auth', require('./routes/auth'))
app.use('/posts', require('./routes/posts'))
app.use('/importers', require('./routes/importers'))


app.listen(process.env.PORT || 8000 )

