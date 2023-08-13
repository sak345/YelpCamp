const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Review = require('./reviews')
const { required } = require('joi')
const { cloudinary } = require('../cloudinary')


const imageSchema = new Schema({
    url: String,
    filename: String
})

imageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/c_fit,h_300,w_300')
});

const campgroundSchema = new Schema({
    title: {
        type: String,
        required: [true, "Name cannot be empty."]
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    price: {
        type: Number,
        required: [true, "Price cannot be empty."]
    },
    img: [imageSchema],
    description: {
        type: String,
        required: [true, "Description cannot be empty."]
    },
    location: {
        type: String,
        required: [true, "Location cannot be empty."]
    },
    geometry: {
        type: {
            type: 'String',
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
})

campgroundSchema.post('findOneAndDelete', async function (camp) {//query middleware to delete all reviews on that campground
    if (camp.reviews.length) {
        await Review.deleteMany({ _id: { $in: camp.reviews } })
    }
    for (let img of camp.img) {
        await cloudinary.uploader.destroy(img.filename)
    }
})

module.exports = mongoose.model('Campground', campgroundSchema)