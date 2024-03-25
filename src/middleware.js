module.exports = function (options) {
    console.log('middleware - options : ', options)
    return function (req, res, next) {
        // Implement the middleware function based on the options object
        console.log('middleware for each request - options : ', options)
        next()
    }
}
