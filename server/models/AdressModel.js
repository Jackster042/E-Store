const { Schema, model } = require("mongoose");

const AddressSchema = new Schema(
  {
    userId: String,
    address: String,
    city: String,
    pincode: String,
    phone: String,
    notes: String,
  },
  {
    timestamps: true,
  }
);

const AddressModel = model("Address", AddressSchema);

module.exports = AddressModel;
