module.exports = func => {//function which return another function with .catch() method
    return function (req, res, next) {
        func(req, res, next).catch(next);
    }
}