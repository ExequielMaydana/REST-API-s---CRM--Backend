const mongoose = require('mongoose')
const { Schema } = mongoose

const ordersSchema = new Schema({
    client: {
        type: Schema.ObjectId,
        ref: 'Clients'
    },
    orders: [{
        product: {
            type: Schema.ObjectId,
            ref: 'Products'
        },
        quantity: Number
    }],
    total: {
        type: Number
    }
})

module.exports = mongoose.model('Orders', ordersSchema)