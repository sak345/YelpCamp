const Review = require('../models/reviews')
const Campground = require('../models/campgrounds')

module.exports.createReview = async (req, res) => {//handling posting a new review
    const { id } = req.params
    const campground = await Campground.findById(id)
    const review = new Review(req.body.review)
    review.author = req.user._id
    campground.reviews.push(review)
    await campground.save()
    await review.save()
    req.flash('success', "Review submitted!")
    res.redirect(`/campgrounds/${campground._id}`)
}

module.exports.deleteReview = async (req, res) => {//handling deleting a review
    const { id, reviewId } = req.params
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
    await Review.findByIdAndDelete(reviewId)
    req.flash('success', "Review deleted!")
    res.redirect(`/campgrounds/${id}`)
}