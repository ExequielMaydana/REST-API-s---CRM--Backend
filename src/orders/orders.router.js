const router = require('express').Router()
const ordersServices = require('./orders.http')

router.route('/pedidos')
    .get(ordersServices.getAll)
    .post(ordersServices.newOrder)

router.route('/pedidos/:id')
    .get(ordersServices.getById)
    .put(ordersServices.updateOrder)
    .delete(ordersServices.removeOrder)

    
module.exports = {
    router
}