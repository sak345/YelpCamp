const Joi = require('joi')

module.exports.campgroundSchema = Joi.object({
    campground: Joi.object({
        title: Joi.string()
            .min(3)
            .max(30)
            .trim()
            .required(),
        location: Joi.string().trim().required(),
        img: Joi.string().trim().required(),
        price: Joi.number().min(0).required(),
        description: Joi.string().min(20).trim().required()

    }).required()
})
