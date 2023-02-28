const router = require("express").Router();
const clientsServices = require("./clients.http");

router
  .route("/clientes")
  .get(clientsServices.getAll)
  .post(clientsServices.newCustomer);

router
  .route("/clientes/:id")
  .get(clientsServices.getById)
  .put(clientsServices.updateCustomer)
  .delete(clientsServices.removeCustomer);

module.exports = {
  router,
};
