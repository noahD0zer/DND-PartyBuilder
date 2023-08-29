const express = require('express');
const path = require('path');
const passport = require('passport'); // Import passport
const middleware = require('./config/middleware');
const mongoose = require('mongoose');
require('dotenv').config();

const AuthRouter = require('./controllers/authController'); // Import your auth routes
const PartiesRouter = require('./controllers/partyController');
const AdventurerRouter = require('./controllers/adventurerController');

// Require your passport configuration
const passportConfig = require('./config/passport');

const app = express();

middleware(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

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

app.use('/', AuthRouter); // Use the AuthRouter for authentication routes
app.use('/parties', PartiesRouter);
app.use('/adventurers', AdventurerRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
