const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');

// Import configuration
const connectDB = require('./config/db');
require('./config/passport'); // Initialize passport strategy

// Import routes
const authRoutes = require('./routes/authRoutes');
const gameRoutes = require('./routes/gameRoutes');
const openaiRoutes = require('./routes/openaiRoutes');

// Connect to Database
connectDB();

const app = express();

// Middlewares
app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin: ['https://662cf1679d51f3c26c3b405e--preeminent-sunburst-1c09dd.netlify.app', 'http://localhost:3000'],
    methods: 'GET,POST,PUT',
    credentials: true,
}));

app.use(bodyParser.json());
app.use(express.json());

// Apply Routes
app.use('/auth', authRoutes);
app.use('/db', gameRoutes);
app.use('/openai', openaiRoutes);

app.listen(5000, () => {
    console.log('server is listening on port 5000...');
});
