const Campground = require('../models/campgrounds')

module.exports.allCampgrounds = async (req, res) => {//displays all campgrounds
    const camps = await Campground.find({}).populate('reviews')
    res.render('campgrounds/index', { camps })
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
    const newCamp = new Campground(req.body.campground)
    newCamp.author = req.user._id
    await newCamp.save()
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
    await Campground.findByIdAndUpdate(req.params.id, req.body.campground)
    req.flash('success', 'Changes Saved!')
    res.redirect(`/campgrounds/${req.params.id}`)
}

module.exports.deleteCampground = async (req, res) => {//deletes a particular campground
    await Campground.findByIdAndDelete(req.params.id)
    req.flash('success', "Campground deleted!")
    res.redirect('/campgrounds')
}