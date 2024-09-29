const { Address } = require("../models/addressModel");

exports.addAddress = async (req, res) => {
  try {
    const { userId, address } = req.body;
    const newAddress = new Address({ userId, address });
    await newAddress.save();
    res.send({ status: "Address Added" });
  } catch (error) {
    res.status(500).send({ error: "Error Adding Address" });
  }
};
