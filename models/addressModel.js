const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  address: String,
});

const Address = mongoose.model("Address", AddressSchema);
module.exports = { Address };
