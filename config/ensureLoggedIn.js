// for routes requiring login
module.exports = function(req, res, next) {
    //next middleware route
    if (req.isAuthenticated()) return next()
    res.redirect('/auth/google')
}