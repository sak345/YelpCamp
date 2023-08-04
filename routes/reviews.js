const express = require('express')
const router = express.Router({ mergeParams: true });
const { reviewSchema } = require('../schemas.js')
const Review = require('../models/reviews')
const catchAsync = require('../utilities/catchAsyncError')
const expressError = require('../utilities/expressError')
const Campground = require('../models/campgrounds')

//review validator
const validateReview = (req, res, next) => {//middleware to validate reviews
    const userInputs = req.body
    const { error } = reviewSchema.validate(userInputs)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        req.flash('err', 'Please provide your review in atleast 10 characters')
        req.flash('formData', userInputs)//storing the userInputs in the current session so that we can pre-fill the form after displaying the flash message
        res.redirect('back')
        //throw new expressError(msg, 400)//can be used to throw an error and display msg on new page instead of flash message
    } else {
        next()
    }
}

//reviews routes
router.post('', validateReview, catchAsync(async (req, res) => {//handling posting a new review
    const { id } = req.params
    const campground = await Campground.findById(id)
    const review = new Review(req.body.review)
    campground.reviews.push(review)
    await campground.save()
    await review.save()
    req.flash('success', "Review submitted!")
    res.redirect(`/campgrounds/${campground._id}`)
}))

router.delete('/:reviewId', catchAsync(async (req, res) => {//handling deleting a review
    const { id, reviewId } = req.params
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
    await Review.findByIdAndDelete(reviewId)
    req.flash('success', "Review deleted!")
    res.redirect(`/campgrounds/${id}`)
}))

module.exports = router;