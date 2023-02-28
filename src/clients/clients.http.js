const Clients = require("../models/Clients");

const getAll = async (req, res) => {
  const customers = await Clients.find({});
  if (customers.length <= 0) {
    return res.status(204).json({ message: "There are no customers" });
  } else {
    return res.status(200).json({ items: customers.length, customers });
  }
};

const getById = async (req, res) => {
  const idCustomer = req.params.id;
  const customer = await Clients.findById(idCustomer);
  if (!customer) {
    return res
      .status(400)
      .json({ message: `There is no customer with that ${idCustomer}` });
  } else {
    return res.status(200).json(customer);
  }
};

const newCustomer = async (req, res, next) => {
  const customer = new Clients(req.body);
  try {
    await customer.save();
    res
      .status(201)
      .json({
        message: "The customer was successfully created",
        customer: customer,
      });
  } catch (error) {
    res.status(400).json({ message: error });
    next();
  }
};

const updateCustomer = async (req, res, next) => {
  const newData = req.body;
  const idCustomer = req.params.id;
  try {
    const customer = await Clients.findOneAndUpdate(
      { _id: idCustomer },
      newData,
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Customer successfully modified", customer });
  } catch (error) {
    res.status(400).json({ message: error });
    next();
  }
};

const removeCustomer = async (req, res, next) => {
  const idCustomer = req.params.id;

  try {
    await Clients.findOneAndDelete({_id: idCustomer});
    res.status(200).json({ message: "The customer has been deleted" });
  } catch (error) {
    res.status(400).json({ message: error });
    next();
  }
};

module.exports = {
  getAll,
  newCustomer,
  getById,
  updateCustomer,
  removeCustomer,
};
