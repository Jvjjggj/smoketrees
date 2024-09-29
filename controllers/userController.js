const { User } = require("../models/userModel");
const { Address } = require("../models/addressModel");
const bcrypt = require("bcryptjs");

exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, address } = req.body;

    // Check if user already exists
    const oldUser = await User.findOne({ email });
    if (oldUser) {
        return res.status(400).send({ status: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    // Create the address
    const newAddress = await Address.create({
        userId: newUser._id, // Use the newly created user ID
        address,
    });

    res.status(201).send({
        status: "User and Address Registered Successfully",
        user: newUser,
        address: newAddress,
    });
} catch (error) {
    console.error(error);
    res.status(500).send({ status: "Error occurred during registration" });
}
};
