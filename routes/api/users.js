const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const config = require('../../config/config');
const isEmpty = require('../../utils/is-empty');

// User model
const User = require('../../models/User');

/**
 * @route GET api/users/test
 * @desc Test users route
 * @access Public
 */
router.get('/test', (req, res) => res.json({ message: 'User route works!' }));

/**
 * @route GET api/users/all
 * @desc Get all users
 * @access Public
 */
router.get('/all', (req, res) => {
  let errors = {};

  User.find()
    .populate('user')
    .then(users => {
      if (!users || users.length < 1) {
        errors.nousers = 'There are no users yet.';
        return res.status(404).json(errors);
      }

      res.json(users);
    })
    .catch(err => res.status(404).json({ nousers: 'There are no users.' }));
});

/**
 * @route POST api/users/register
 * @desc Register a user
 * @access Public
 */
router.post('/register', (req, res) => {
  let errors = {};
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Email already exist';
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: 200,
        r: 'pg',
        default: 'mm'
      });

      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        referenceNumber: req.body.referenceNumber,
        avatar,
        dob: req.body.dob
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

/**
 * @route POST api/users/login
 * @desc Login user
 * @access Public
 */
router.post('/login', (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let errors = {};

  email = !isEmpty(email) ? email : '';
  password = !isEmpty(password) ? password : '';

  if (validator.isEmpty(email)) {
    errors.email = 'Email is required.';
    return res.status(400).json(errors);
  }

  if (!validator.isEmpty(email) && !validator.isEmail(email)) {
    errors.email = 'Email is not valid.';
    return res.status(400).json(errors);
  }

  if (validator.isEmpty(password)) {
    errors.password = 'Password is required.';
    return res.status(400).json(errors);
  }

  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ nouserfound: 'User not found' });
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.username,
          avatar: user.avatar
        };

        jwt.sign(
          payload,
          config.secretOrKey,
          { expiresIn: 10800 },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token,
              email: user.email
            });
          }
        );
      } else {
        return res.status(400).json({ passworderror: 'Password incorrect.' });
      }
    });
  });
});

/**
 * @route GET api/users/current
 * @desc Get current user
 * @access Private
 */
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.username,
      email: req.user.email
    });
  }
);

module.exports = router;
