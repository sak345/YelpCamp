const Joi = require('joi')

module.exports.campgroundSchema = Joi.object({//schema to vaildate campgrounds
    campground: Joi.object({
        title: Joi.string()
            .min(3)
            .max(30)
            .trim()
            .required(),
        location: Joi.string().trim().required(),
        img: Joi.string().trim().required(),
        price: Joi.number().min(0).required(),
        description: Joi.string().min(20).trim().required(),
        reviews: Joi.array()

    }).required()
})

module.exports.reviewSchema = Joi.object({//schema to validate reviews
    review: Joi.object({
        rating: Joi.number().min(1).max(5).required(),
        body: Joi.string().min(10).trim().required()
    }).required()
})