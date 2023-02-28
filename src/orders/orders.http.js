const Orders = require("../models/Orders");

// servicio para mostrar todas las compras
const getAll = async (req, res) => {
  const allOrders = await Orders.find().populate("client").populate({
    path: "orders.product",
    model: "Products",
  });
  if (allOrders.length <= 0) {
    res.status(200).json({ message: "No orders in the database" });
  } else {
    res.status(200).json(allOrders);
  }
};

const getById = async (req, res) => {
  const idOrder = req.params.id;
  const order = await Orders.findById(idOrder).populate("client").populate({
    path: "orders.product",
    model: "Products",
  });
  if (!order) {
     res.status(400).json({ message: "There is no order with this" });
  } else {
     res.status(200).json(order);
  }
};

// servicio para crear una nueva compra
const newOrder = async (req, res, next) => {
  const dataOrder = req.body;

  const order = new Orders(dataOrder);
  try {
    await order.save();
    res
      .status(201)
      .json({ message: "The order was successfully created", order });
  } catch (error) {
    res.status(400).json({ message: error });
    next();
  }
};

const updateOrder = async (req, res, next) => {
    const idOrder = req.params.id
    const newDateOrder = req.body
    try {
        const order = await Orders.findOneAndUpdate({_id: idOrder}, newDateOrder, {new: true}).populate("client").populate({
            path: "orders.product",
            model: "Products",
          })
        res.status(200).json({message: "The order was successfully modified", order})
    } catch (error) {
        res.status(400).json({message: error})
        next()
    }
}

const removeOrder = async (req, res, next) => {
    const idOrder = req.params.id

    try {
        await Orders.findOneAndDelete({_id: idOrder})
        res.status(200).json({message: "The order was successfully deleted"})
    } catch (error) {
        res.status(400).json({message: "The order you are trying to delete does not exist"})
        next()
    }
}

module.exports = {
  getAll,
  getById,
  newOrder,
  updateOrder,
  removeOrder
};
