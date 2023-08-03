const express = require('express')
const router = express.Router({mergeParams: true});
const {reviewSchema} = require('../schemas.js')
const Review = require('../models/reviews')
const catchAsync = require('../utilities/catchAsyncError')
const expressError = require('../utilities/expressError')
const Campground = require('../models/campgrounds')

//review validator
const validateReview = (req, res, next) => {
    const {error} = reviewSchema.validate(req.body)
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new expressError(msg, 400)
    }else{
        next()
    }
}

//reviews routes
router.post('', validateReview, catchAsync(async (req, res) => {
    const {id} = req.params
    const campground = await Campground.findById(id)
    const review = new Review(req.body.review)
    campground.reviews.push(review)
    await campground.save()
    await review.save()
    req.flash('success', "Review submitted!")
    res.redirect(`/campgrounds/${campground._id}`)
}))

router.delete('/:reviewId', catchAsync(async(req, res) => {
    const {id, reviewId} = req.params
    await Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewId}})
    await Review.findByIdAndDelete(reviewId)
    req.flash('success', "Review deleted!")
    res.redirect(`/campgrounds/${id}`)
}))

module.exports = router;