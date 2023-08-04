//imports
const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate')
const expressError = require('./utilities/expressError')
const session = require('express-session')
const flash = require('connect-flash')

const campgroundRouter = require('./routes/campgrounds')
const reviewRouter = require('./routes/reviews')

//connecting database
mongoose.connect('mongodb://127.0.0.1:27017/yelpCamp')
const db = mongoose.connection
db.on("error", console.error.bind(console, 'Connection Error'))
db.once("open", () => {
    console.log("Database connected!")
})

//utilities
app.engine('ejs', ejsMate)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, '/public')))

const sessionConfig = {
    secret: 'thiswillbeupdatedinthefuture',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24,
        maxAge: 1000 * 60 * 60 * 24
    }
}
app.use(session(sessionConfig))

app.use(flash())
app.use((req, res, next) => {
    res.locals.success = req.flash('success')
    res.locals.err = req.flash('err')
    res.locals.formData = req.flash('formData')//used to store the formData entered by user to pre-fill the form with this data
    next();
})

//home page
app.get('/', (req, res) => {
    res.render('home')
})

//campgrounds routes
app.use('/campgrounds', campgroundRouter)

//reviews routes
app.use('/campgrounds/:id/reviews', reviewRouter)

//error handlers
app.all('*', (req, res, next) => {
    next(new expressError('404! Page not found :(', 404));
})

app.use((err, req, res, next) => {
    if (!err.message) err.message = "Oh no! Something went wrong! :("
    if (!err.statusCode) err.statusCode = 500;
    if (err.name === 'CastError') {
        err.message = "Sorry! We could not find what you requested for."
        err.statusCode = 400;
    }
    res.status(err.statusCode).render('error', { err });
})

//listener
app.listen(3000, () => {
    console.log("Serving on port: 3000");
})