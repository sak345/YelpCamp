const Joi = require('joi')

module.exports.campgroundSchema = Joi.object({
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