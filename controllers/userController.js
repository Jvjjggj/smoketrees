const { User } = require("../models/userModel");
const { Address } = require("../models/addressModel");
const bcrypt = require("bcryptjs");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, address } = req.body;
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ name, email, password: hashedPassword });
    const savedUser = await newUser.save();

    // Create new address and link to the saved user
    const newAddress = new Address({ userId: savedUser._id, address });
    await newAddress.save();

    res.send({ status: "User and Address Registered Successfully", user: savedUser, address: newAddress });
  } catch (error) {
    res.status(500).send({ error: "Error Registering User or Address" });
  }
};
