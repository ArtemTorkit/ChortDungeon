const express = require('express');
const passport = require('passport')
const bodyParser = require('body-parser')
const session = require('express-session')
const cors = require('cors')

//auth connection
require('./auth')
//creating server obj
const app = express();

//auth uses
app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}))
app.use(passport.initialize());
app.use(passport.session())

//openai uses
app.use(bodyParser.json())

//general uses
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST',
    credentials: true,
}))
app.use(express.json())

//connection and server routes of openai
const openaiRoutes = require('./routes/openai');
app.use('/openai', openaiRoutes);  

//connection of database and database routes
const dbRoutes = require('./routes/mongodb');
app.use('/db', dbRoutes)

//connection of auth routes
const authRoutes = require('./routes/auth')
app.use('/auth', authRoutes)

app.listen(5000, () => {
    console.log('server is listening on port 5000...')
})
