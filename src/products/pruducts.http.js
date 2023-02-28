const Products = require("../models/Products");
const { upload } = require("../utils/multer");

const getAllProducts = async (req, res) => {
  const products = await Products.find({});
  if (products.length <= 0) {
    return res
      .status(400)
      .json({ message: "There are no products to display" });
  } else {
    res.status(200).json({ items: products.length, products });
  }
};

// servicio para mostrar un producto por medio del ID
const getById = async (req, res) => {
  const idProduct = req.params.id;
  const product = await Products.findById(idProduct);
  if (!product) {
    return res
      .status(400)
      .json({ message: `There is no product with this ${idProduct}` });
  } else {
    return res.status(200).json(product);
  }
};

// servicio para subir una imagen
const addImgProduct = (req, res, next) => {
  upload(req, res, function (error) {
    if (error) {
      res.status(400).json({ message: error });
    }
    return next();
  });
};

// servicio para almacenar un producto en la db
const addProduct = async (req, res, next) => {
  const file = req.file.filename;
  const data = req.body;
  const newProduct = new Products(data);

  try {
    if (file) {
      newProduct.img = file;
    }
    await newProduct.save();
    res
      .status(201)
      .json({ message: "The product was successfully created", newProduct });
  } catch (error) {
    res.status(400).json({ message: error });
    next();
  }
};

// servicio para editar un producto
const putProduct = async (req, res, next) => {
  const newData = req.body; // la nueva data
  const idProduct = req.params.id;
  try {
    // traemos el producto que ya estaba almacenado
    const productPrevious = await Products.findById({ _id: idProduct });

    // img nueva
    if (req.file) {
      newData.img = req.file.filename;
    } else {
      newData.img = productPrevious.img;
    }

    const product = await Products.findOneAndUpdate(
      { _id: idProduct },
      newData,
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Product was successfully modified", product });
  } catch (error) {
    res.status(400).json({ message: error });
    next();
  }
};

// servicio para eliminar un producto
const deleteProduct = async (req, res, next) => {
  const idProduct = req.params.id;
  try {
    await Products.findByIdAndDelete(idProduct);
    res.status(200).json({ message: "The product was successfully removed" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "The product to be deleted does not exist" });
    next();
  }
};

module.exports = {
  getAllProducts,
  getById,
  addImgProduct,
  addProduct,
  putProduct,
  deleteProduct,
};
