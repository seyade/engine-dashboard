const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

// Routes
const users = require('./routes/api/users');
// const users = require('./routes/api/accounts');

const app = express();

const db = require('./config/config');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(db.mongoURI)
  .then(() => console.log('Connected with MongoDB'))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

// Setup routes
app.use('/api/users', users);

const port = process.env.PORT || 5500;

app.listen(port, () => console.log(`Engine server running on port ${port}`));
