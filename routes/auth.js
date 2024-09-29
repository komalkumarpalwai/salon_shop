const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

router.get('/membership', (req, res) => {
  if (req.isAuthenticated()) {
    // If user is authenticated, redirect to protected route
    res.redirect('/protected');
  } else {
    // If user is not authenticated, render the membership page with login button
    const authLink = '<a href="/auth/google" class="btn btn-google"><i class="fab fa-google"></i> Login with Google</a>';
    res.render('membership', { authLink });
  }
});

router.get('/membership/payment',
  passport.authenticate('google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/google/failure'
  })
);

router.get('/protected', isLoggedIn, (req, res) => {
  res.render('payment', { displayName: req.user.displayName });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/auth/google/failure', (req, res) => {
  res.send('Failed to authenticate..');
});

router.get('/', (req, res) => {
  // Render index page with login button if user is not authenticated
  if (req.isAuthenticated()) {
    res.render('index');
  } else {
    const authLink = '<a href="/auth/google" class="btn btn-google"><i class="fab fa-google"></i> Login with Google</a>';
    res.render('index', { authLink });
  }
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

module.exports = router;
