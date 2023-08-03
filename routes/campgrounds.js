const express = require('express')
const router = express.Router();
const Campground = require('../models/campgrounds')
const catchAsync = require('../utilities/catchAsyncError')
const expressError = require('../utilities/expressError')
const {campgroundSchema} = require('../schemas.js')

//campground validator
const validateCampground = (req, res, next) => {
    const {error} = campgroundSchema.validate(req.body)
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new expressError(msg, 400)
    }else{
        next();
    }
}

//campgrounds routes
router.get('', catchAsync(async (req, res) => {
    const camps = await Campground.find({})
    res.render('campgrounds/index', {camps})
}))

router.get('/new', (req, res) => {
    res.render('campgrounds/new')
})

router.get('/:id', catchAsync(async (req, res) => {
    const camp = await Campground.findById(req.params.id).populate('reviews')
    if(!camp){
        req.flash('err', 'Sorry! We could not find that campground')
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', {camp})
}))

router.post('', validateCampground, catchAsync(async (req, res, next) => {
    const newCamp = new Campground(req.body.campground)
    await newCamp.save()
    req.flash('success', 'Successfully added a new campground!')
    res.redirect(`/campgrounds/${newCamp._id}`)
}))

router.get('/:id/edit', catchAsync(async(req, res) => {
    const camp = await Campground.findById(req.params.id)
    if(!camp){
        req.flash('err', 'Sorry! We could not find that campground')
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', {camp})
}))

router.put('/:id', validateCampground, catchAsync(async(req, res) => {
    await Campground.findByIdAndUpdate(req.params.id, req.body.campground)
    req.flash('success', 'Changes Saved!')
    res.redirect(`/campgrounds/${req.params.id}`)
}))

router.delete('/:id', catchAsync(async(req, res) => {
    await Campground.findByIdAndDelete(req.params.id)
    req.flash('success', "Campground deleted!")
    res.redirect('/campgrounds')
}))

module.exports = router