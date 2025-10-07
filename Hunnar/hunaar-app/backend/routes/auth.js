const express = require('express');
const { body, validationResult } = require('express-validator');
const { supabasePublic } = require('../config/supabase');

const router = express.Router();

// Validation middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors.array()
    });
  }
  next();
};

// Sign up
router.post('/signup',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    body('fullName').isLength({ min: 2 }).trim()
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { email, password, fullName } = req.body;

      const { data, error } = await supabasePublic.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
      });

      if (error) {
        return res.status(400).json({ error: error.message });
      }

      res.status(201).json({
        message: 'User created successfully',
        user: data.user,
        session: data.session
      });

    } catch (error) {
      console.error('Signup error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

// Sign in
router.post('/signin',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').exists()
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { email, password } = req.body;

      const { data, error } = await supabasePublic.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        return res.status(401).json({ error: error.message });
      }

      res.json({
        message: 'Sign in successful',
        user: data.user,
        session: data.session
      });

    } catch (error) {
      console.error('Signin error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

// Sign out
router.post('/signout', async (req, res) => {
  try {
    const { error } = await supabasePublic.auth.signOut();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: 'Sign out successful' });

  } catch (error) {
    console.error('Signout error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get current user profile
router.get('/profile', async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Access token required' });
    }

    const { data: { user }, error } = await supabasePublic.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    res.json({ user });

  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Password reset request
router.post('/reset-password',
  [body('email').isEmail().normalizeEmail()],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { email } = req.body;

      const { error } = await supabasePublic.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.FRONTEND_URL}/reset-password`
      });

      if (error) {
        return res.status(400).json({ error: error.message });
      }

      res.json({ message: 'Password reset email sent' });

    } catch (error) {
      console.error('Password reset error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

module.exports = router;