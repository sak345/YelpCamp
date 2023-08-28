const Campground = require('../models/campgrounds')
const { cloudinary } = require('../cloudinary')
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding')
const mapBoxToken = process.env.mapbox_token
const geoCoder = mbxGeocoding({ accessToken: mapBoxToken })

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports.allCampgrounds = async (req, res) => {//displays all campgrounds
    let regex = '';
    if (req.query.search) {
        regex = new RegExp(escapeRegex(req.query.search), 'gi');
    }

    let camps = await Campground.find({
        $or: [
            {
                title: {
                    $regex: regex,
                }
            },
            {
                location: {
                    $regex: regex,
                }
            }
        ]
    }).populate('reviews')
    if (camps.length < 1) {
        req.flash('err', "Sorry, no matches found, try searching again...")
        return res.redirect('/campgrounds')
    }
    if (req.query.sort == "Rating" && camps.length > 0) {
        camps.sort((camp1, camp2) => {
            if (camp1.reviews.length > 0 && camp2.reviews.length > 0) {
                let overallRating1 = 0, overallRating2 = 0;
                for (let i = 0; i < camp1.reviews.length; i++) {
                    overallRating1 += camp1.reviews[i].rating;
                }
                overallRating1 /= camp1.reviews.length;
                for (let i = 0; i < camp2.reviews.length; i++) {
                    overallRating2 += camp2.reviews[i].rating;
                }
                overallRating2 /= camp2.reviews.length;

                return overallRating2 - overallRating1;
            }
            else if (camp1.reviews.length > 0) {
                return -1;
            }
            else if (camp2.reviews.length > 0) {
                return 1;
            } else {
                return 0;
            }
        })
    } else if (req.query.sort == "Reviews" && camps.length > 0) {
        camps.sort((camp1, camp2) => {
            return camp2.reviews.length - camp1.reviews.length;
        })
    }

    res.render('campgrounds/index', { camps, sort: req.query.sort, search: req.query.search })
}

module.exports.renderNewForm = (req, res) => {//opens a form to post new campground
    res.render('campgrounds/new')
}

module.exports.showCampground = async (req, res) => {//displays a particular campground
    const camp = await Campground.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author')
    if (!camp) {
        req.flash('err', 'Sorry! We could not find that campground')
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', { camp })
}

module.exports.createCampground = async (req, res, next) => {//adds a new campground
    const geoData = await geoCoder.forwardGeocode({
        query: req.body.campground.location
    }).send()
    const newCamp = new Campground(req.body.campground)
    newCamp.geometry = geoData.body.features[0].geometry;
    newCamp.img = req.files.map(f => ({ url: f.path, filename: f.filename }))
    newCamp.author = req.user._id
    await newCamp.save()
    console.log(newCamp)
    req.flash('success', 'Successfully added a new campground!')
    res.redirect(`/campgrounds/${newCamp._id}`)
}

module.exports.renderEditForm = async (req, res) => {//opens a form to edit a particular campground
    const camp = await Campground.findById(req.params.id)
    if (!camp) {
        req.flash('err', 'Sorry! We could not find that campground')
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', { camp })
}

module.exports.updateCampground = async (req, res) => {//edit request to a particular campground
    const geoData = await geoCoder.forwardGeocode({
        query: req.body.campground.location
    }).send()
    const campground = await Campground.findByIdAndUpdate(req.params.id, req.body.campground)
    campground.geometry = geoData.body.features[0].geometry;
    campground.img.push(... (req.files.map(f => ({ url: f.path, filename: f.filename }))))
    await campground.save();
    if (req.body.deleteImages) {
        if (campground.img.length === req.body.deleteImages.length && req.files.length === 0) {
            req.flash('err', 'You cannot delete all images of your campground!')
            return res.redirect(`/campgrounds/${req.params.id}/edit`)
        }
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename)
        }

        await campground.updateOne({ $pull: { img: { filename: { $in: req.body.deleteImages } } } })

    }
    req.flash('success', 'Changes Saved!')
    res.redirect(`/campgrounds/${req.params.id}`)
}

module.exports.deleteCampground = async (req, res) => {//deletes a particular campground
    await Campground.findByIdAndDelete(req.params.id)
    req.flash('success', "Campground deleted!")
    res.redirect('/campgrounds')
}