const mongoose = require('mongoose')
const Campground = require('../models/campgrounds')
const User = require('../models/user')
const Review = require('../models/reviews')
const cities = require('./cities')
const { descriptors, places } = require('./seedHelpers')


mongoose.connect('mongodb://127.0.0.1:27017/yelpCamp')


const db = mongoose.connection
db.on("error", console.error.bind(console, 'Connection Error'))
db.once("open", () => {
})


const randomGenerator = (arr) => arr[Math.floor(Math.random() * arr.length)]

const createAdmin = async () => {
    await Review.deleteMany({})
    await User.deleteMany({})
    const admin = new User({
        username: 'admin',
        email: 'admin.yelpCamp@gmail.com',
        salt: 'ea48f6b244f7d3b40c9126835965901307ed35418ead59b45af48fb6e571e480',
        hash: 'f430047c76ee37f3941b18a8a7a69366fdd408dc6d9e961104c6b389d2d72eee8dcbb813f6b0c5beaa79e1dd6993bdddc2fc43aa0d4e4e2f2e827d0267fe455946c7d9ce871f276282a789db6549747df9ad66933addd76e6271590c302129a2457429bc26c4de367aad8fb3d12236a30586d9ec6d42406a63f721d1b5370bda5073ec07062d20f6de9a5bc7058b41df6c4af789cb539fc206ed0a4b17fa4dfde59653dfc178a0917ec5185cd7c16ce4af04a195421dbd7b473fe0f9144a3818af28788311204c99466865a3881fe895eaf51c09bb7e7a1bad538bc2645efb9cb3d2d7343074f1a1e0beec57404f4e8a539011f987d81be2051c7e5c548c5804d894b68828cc77e4da0efd11a59bb9fd99f91e66e52bcf4362a70606b983984f941157461c8273d1053a81bc6b49173ae705cafccb7f8f4a786ef38bcb43768695165205d9be9587278b4a68b783b405d03f39c9c87c59bf30771b0be48c4e5ee4a3ea000386965bc74980058f2e22fd2596d9ea110d8e16ba9138b05b52b28fc3857e5a2b94b8d14d738ec207cf8c7817e1a0f3ec3a0fd3c433b456248e650bad994221d3e039e35151c79fb770a2ecfbfec757de7b4034d64ef29c3300a28dd8d8699116f1a8e25fe18d63d119550a03ec9109c9594049b9b24dcd78179eeb8808acf631e1d61a6d2c54e78bed03be70749bb19c9a51a5aa427976f3c1395f'
    })
    await admin.save();
}



const fetchImage = async (collectionId) => {
    const response = await fetch(`https://source.unsplash.com/collection/${collectionId}`)
    return response.url
}


const seedDB = async () => {//function to randomly generate basic information of campgrounds
    const alreadySeeded = (await Campground.find()).length
    if (alreadySeeded) { //check if database is already seeded
        console.log('Database already seeded')
        return;
    }
    console.log("Please wait while we seed the database...")
    await createAdmin();
    await Campground.deleteMany({})
    const admin = await User.findOne({ username: 'admin' })
    for (let i = 0; i < 30; i++) {

        const city = randomGenerator(cities)
        const price = Math.floor(Math.random() * 30) + 10;
        const camp = new Campground({
            title: `${randomGenerator(descriptors)} ${randomGenerator(places)}`,
            author: admin._id,
            location: `${city.city}, ${city.state} `,
            img: [
                {
                    url: await fetchImage(429524),
                    filename: `${randomGenerator(descriptors)}${randomGenerator(places)}-1`
                },
                {
                    url: await fetchImage(9046579),
                    filename: `${randomGenerator(descriptors)}${randomGenerator(places)}-2`
                }
            ],
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione aspernatur id delectus ex corporis sed dolorem at voluptatibus ipsa quo accusantium mollitia officia, consectetur, explicabo eum inventore! Voluptas, consequuntur velit.',
            price
        })
        await camp.save()


        process.stdout.clearLine(); // Clear the current line in the console
        process.stdout.cursorTo(0); // Move the cursor to the beginning of the line
        process.stdout.write(`Completed: ${i + 1}/30`); // Write the updated value
    }
    console.log("\nDatabase seeded!\nVisit: http://localhost:3000/campgrounds & start exploring. :)")
}

module.exports = seedDB;