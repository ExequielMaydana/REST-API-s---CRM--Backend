const mongoose = require('mongoose')
const { Schema } = mongoose;

const productsSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    price: {
        type: Number
    },
    img: {
        type: String
    }
})


module.exports = mongoose.model('Products', productsSchema)