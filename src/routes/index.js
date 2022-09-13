// const productRoutes = require('./product')
const authRoutes = require('./auth')
const siteRoutes = require('./site')

module.exports = [].concat(authRoutes, siteRoutes)
