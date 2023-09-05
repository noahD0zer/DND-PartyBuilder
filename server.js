const passport = require('passport'); // Import passport
const express = require('express');
const path = require('path');

const middleware = require('./config/middleware');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

//express session
app.use(require('express-session')({ 
  secret: 'Enter your secret key',
  resave: true,
  saveUninitialized: true
}));

// Require your passport configuration
app.use(passport.initialize());
app.use(passport.session());

//Routes
const AuthRouter = require('./controllers/auth'); // Import your auth routes
const PartiesRouter = require('./controllers/parties');
const UsersRouter = require('./controllers/users');

//app config
//app.use(express.static(path.join(__dirname, 'public')));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

middleware(app)



// Connect to MongoDB
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
}); 

app.get('/', (req, res) => {
  res.render('index', { title: 'Main Page' });
});

// Use Routers
app.use('/', AuthRouter); // Use the AuthRouter for authentication routes
app.use('/parties', PartiesRouter);
// app.use('/adventurers', AdventurerRouter);
app.use('/users', UsersRouter);


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
