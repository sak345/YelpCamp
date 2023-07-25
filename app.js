const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const Campground = require('./models/campgrounds')
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate')
const catchAsync = require('./utilities/catchAsyncError')
const expressError = require('./utilities/expressError')
const Joi = require('joi')

mongoose.connect('mongodb://127.0.0.1:27017/yelpCamp')

const db = mongoose.connection
db.on("error", console.error.bind(console, 'Connection Error'))
db.once("open", () => {
    console.log("Database connected!")
})

app.engine('ejs', ejsMate)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/campgrounds', catchAsync(async (req, res) => {
    const camps = await Campground.find({})
    res.render('campgrounds/index', {camps})
}))

app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new')
})

app.get('/campgrounds/:id', catchAsync(async (req, res) => {
    const camp = await Campground.findById(req.params.id)
    res.render('campgrounds/show', {camp})
}))

app.post('/campgrounds', catchAsync(async (req, res, next) => {
    const campgroundSchema = Joi.object({
        campground: Joi.object({
            title: Joi.string()
                .min(3)
                .max(30)
                .required(),
            location: Joi.string().required(),
            img: Joi.string().required(),
            price: Joi.number().min(0).required(),
            description: Joi.string().min(20).required()

        }).required()
    })
    const {error} = campgroundSchema.validate(req.body)
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new expressError(msg, 400)
    }
    const newCamp = new Campground(req.body.campground)
    await newCamp.save()
    res.redirect(`/campgrounds/${newCamp._id}`)
}))

app.get('/campgrounds/:id/edit', catchAsync(async(req, res) => {
    const camp = await Campground.findById(req.params.id)
    res.render('campgrounds/edit', {camp})
}))

app.put('/campgrounds/:id', catchAsync(async(req, res) => {
    await Campground.findByIdAndUpdate(req.params.id, req.body.campground)
    res.redirect(`/campgrounds/${req.params.id}`)
}))

app.delete('/campgrounds/:id', catchAsync(async(req, res) => {
    await Campground.findByIdAndDelete(req.params.id)
    res.redirect('/campgrounds')
}))

app.all('*', (req, res, next) => {
    next(new expressError('Error 404! Page not found :(', 404));
})

app.use((err, req, res, next) => {
    if(!err.message) err.message = "Oh no! Something went wrong! :("
    if(!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).render('error', {err});
})

app.listen(3000, () => {
    console.log("Serving on port: 3000");
})