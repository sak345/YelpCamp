module.exports.isLoggedIn = ((req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('err', 'You must be logged in to perform that action!')
        return res.redirect('/login')
    }
    next();
})

module.exports.storeReturnTo = ((req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo
    }
    next();
})

module.exports.notLoggedIn = ((req, res, next) => {
    if (req.isAuthenticated()) {
        req.flash('err', "You're already logged in. To switch account, logout first.")
        return res.redirect('/campgrounds')
    }
    next();
})