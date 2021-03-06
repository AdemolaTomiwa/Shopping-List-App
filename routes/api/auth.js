const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

// Item Model
const User = require('../../models/User');

// POST api/auth
// Auth User
// Public

router.post('/', (req, res) => {
   const { email, password } = req.body;

   //    Simple Validation
   if (!email || !password) {
      return res.status(400).json({ msg: 'Please enter all field' });
   }

   // Check for existing user
   User.findOne({ email }).then((user) => {
      if (!user) return res.status(400).json({ msg: 'User does not exist' });

      //   Validate Password
      bcrypt.compare(password, user.password).then((isMatch) => {
         if (!isMatch)
            return res.status(400).json({ msg: 'Invalid Credentials' });

         jwt.sign(
            { id: user.id },
            config.get('jwtSecret'),
            { expiresIn: 3600 },
            (err, token) => {
               if (err) throw err;

               res.json({
                  token,
                  user: {
                     id: user.id,
                     name: user.name,
                     email: user.email,
                  },
               });
            }
         );
      });
   });
});

// GET api/auth/user
// Get User Data
// Public
router.get('/user', auth, (req, res) => {
   User.findById(req.user.id)
      .select('-password')
      .then((user) => res.json(user));
});
module.exports = router;
