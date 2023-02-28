const router = require("express").Router();
const productServices = require("./pruducts.http");
router
  .route("/productos")
  .get(productServices.getAllProducts)
  .post(productServices.addImgProduct ,productServices.addProduct);

router
  .route("/productos/:id")
  .get(productServices.getById)
  .put(productServices.addImgProduct, productServices.putProduct)
  .delete(productServices.deleteProduct)

module.exports = {
  router,
};
