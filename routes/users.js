const express = require('express')
const router = express.Router()
const User = require('../models/user')
const passport = require('passport')
const catchAsync = require('../utilities/catchAsyncError')
const { notLoggedIn, storeReturnTo } = require('../middlewares')
const { route } = require('./reviews')

//view signUp form
router.get('/signUp', notLoggedIn, (req, res) => {
    res.render('users/signUp')
})

//handle a signUp request
router.post('/signUp', notLoggedIn, catchAsync(async (req, res, next) => {
    const { username, email, password } = req.body
    const user = new User({ username, email })
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
        if (err) {
            return next(err);
        }
        req.flash('success', "You've been successfully registered to YelpCamp community!")
        res.redirect('/campgrounds')
    })

}))

//view the login form
router.get('/login', notLoggedIn, (req, res) => {
    res.render('users/login')
})


//handle a login request
router.post('/login', notLoggedIn, storeReturnTo, passport.authenticate('local', {
    failureFlash: { type: 'err', message: 'Username or password is incorrect.' },
    failureRedirect: '/login'
}), (req, res) => {
    const redirectUrl = res.locals.returnTo || '/campgrounds'
    req.flash('success', 'Welcome back! We hope you have a great experience exploring campgrounds.');
    delete req.session.returnTo;
    res.redirect(redirectUrl)
})

//handle a logout request
router.get('/logout', (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('err', "You're already logged out!")
        const redirectUrl = res.locals.returnTo || '/campgrounds'
        return res.redirect(redirectUrl)
    }
    req.logout(function (err) {
        if (err) {
            next(err);
        }
        req.flash('success', 'Logged out! Have a good day ;)')
        res.redirect('/campgrounds')
    })

})

module.exports = router;