const mongoose = require('mongoose')
const Schema = mongoose.Schema

const campgroundSchema = new Schema({
    title: {
        type: String,
        required: [true, "Name cannot be empty."]
    },
    price: {
        type: Number,
        required: [true, "Price cannot be empty."]
    },
    img: {
        type: String,
        required: [true, "Image cannot be empty."]
    },
    description: {
        type: String,
        required: [true, "Description cannot be empty."]
    },
    location: {
        type: String,
        required: [true, "Location cannot be empty."]
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
})

module.exports = mongoose.model('Campground', campgroundSchema)