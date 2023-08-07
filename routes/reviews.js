const express = require('express')
const router = express.Router({ mergeParams: true });
const Review = require('../models/reviews')
const catchAsync = require('../utilities/catchAsyncError')
const Campground = require('../models/campgrounds')
const { isLoggedIn, validateReview, isReviewAuthor } = require('../middlewares')

//reviews routes
router.post('', isLoggedIn, validateReview, catchAsync(async (req, res) => {//handling posting a new review
    const { id } = req.params
    const campground = await Campground.findById(id)
    const review = new Review(req.body.review)
    review.author = req.user._id
    campground.reviews.push(review)
    await campground.save()
    await review.save()
    req.flash('success', "Review submitted!")
    res.redirect(`/campgrounds/${campground._id}`)
}))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(async (req, res) => {//handling deleting a review
    const { id, reviewId } = req.params
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
    await Review.findByIdAndDelete(reviewId)
    req.flash('success', "Review deleted!")
    res.redirect(`/campgrounds/${id}`)
}))

module.exports = router;