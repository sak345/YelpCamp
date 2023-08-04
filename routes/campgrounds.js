const express = require('express')
const router = express.Router();
const Campground = require('../models/campgrounds')
const catchAsync = require('../utilities/catchAsyncError')
const expressError = require('../utilities/expressError')
const { campgroundSchema } = require('../schemas.js')

//campground validator
const validateCampground = (req, res, next) => {//middleware to validate campground
    const userInputs = req.body;
    const { error } = campgroundSchema.validate(userInputs)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        req.flash('err', msg)
        req.flash('formData', userInputs) //storing the userInputs in the current session so that we can pre-fill the form after displaying the flash message
        // throw new expressError(msg, 400) //can be used to throw an error and display msg on new page instead of flash message
        return res.redirect('back')//redirecting to the previous page
    } else {
        next();
    }
}

//campgrounds routes
router.get('', catchAsync(async (req, res) => {//displays all campgrounds
    const camps = await Campground.find({})
    res.render('campgrounds/index', { camps })
}))

router.get('/new', (req, res) => {//opens a form to post new campground
    res.render('campgrounds/new')
})

router.get('/:id', catchAsync(async (req, res) => {//displays a particular campground
    const camp = await Campground.findById(req.params.id).populate('reviews')
    if (!camp) {
        req.flash('err', 'Sorry! We could not find that campground')
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', { camp })
}))

router.post('', validateCampground, catchAsync(async (req, res, next) => {//adds a new campground
    const newCamp = new Campground(req.body.campground)
    await newCamp.save()
    req.flash('success', 'Successfully added a new campground!')
    res.redirect(`/campgrounds/${newCamp._id}`)
}))

router.get('/:id/edit', catchAsync(async (req, res) => {//opens a form to edit a particular campground
    const camp = await Campground.findById(req.params.id)
    if (!camp) {
        req.flash('err', 'Sorry! We could not find that campground')
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', { camp })
}))

router.put('/:id', validateCampground, catchAsync(async (req, res) => {//edit request to a particular campground
    await Campground.findByIdAndUpdate(req.params.id, req.body.campground)
    req.flash('success', 'Changes Saved!')
    res.redirect(`/campgrounds/${req.params.id}`)
}))

router.delete('/:id', catchAsync(async (req, res) => {//deletes a particular campground
    await Campground.findByIdAndDelete(req.params.id)
    req.flash('success', "Campground deleted!")
    res.redirect('/campgrounds')
}))

module.exports = router