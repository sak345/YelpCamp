const mongoose = require('mongoose')
const Campground = require('../models/campgrounds')
const cities = require('./cities')
const {descriptors, places} = require('./seedHelpers')

mongoose.connect('mongodb://127.0.0.1:27017/yelpCamp')


const db = mongoose.connection
db.on("error", console.error.bind(console, 'Connection Error'))
db.once("open", () => {
    console.log("Database connected!")
})


const randomGenerator = (arr) => arr[Math.floor(Math.random() * arr.length)]


const seedDB = async () => {
    await Campground.deleteMany({})
    for(let i = 0; i < 50; i++){
        const city = randomGenerator(cities)
        const price = Math.floor(Math.random()*30) + 10;
        const camp = new Campground({
            title: `${randomGenerator(descriptors)} ${randomGenerator(places)}`,
            location : `${city.city}, ${city.state} `,
            img: 'https://source.unsplash.com/collection/429524',
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione aspernatur id delectus ex corporis sed dolorem at voluptatibus ipsa quo accusantium mollitia officia, consectetur, explicabo eum inventore! Voluptas, consequuntur velit.',
            price
        })
        await camp.save()
    }
}

seedDB().then(() => {
    console.log('Closing connection')
    mongoose.connection.close();
})