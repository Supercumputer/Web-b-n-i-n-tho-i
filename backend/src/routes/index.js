const athu = require('./athu')
const category = require('./category')
const product = require('./product')
const user = require('./user')
const banner = require('./banner')
const post = require('./post')
const order = require('./order')
const notFound = require('../middlewares/errorHandler')

const router = (app) => {
    app.use('/api/athu', athu);
    app.use('/api/category', category)
    app.use('/api/product', product)
    app.use('/api/user', user)
    app.use('/api/banner', banner)
    app.use('/api/post', post)
    app.use('/api/order', order)

    app.use(notFound);
}

module.exports = router