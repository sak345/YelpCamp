const express = require('express')
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utilities/catchAsyncError')
const { isLoggedIn, validateReview, isReviewAuthor } = require('../middlewares')
const reviewController = require('../controllers/reviews')

//reviews routes
router.post('', isLoggedIn, validateReview, catchAsync(reviewController.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviewController.deleteReview))

module.exports = router;