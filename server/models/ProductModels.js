const { Schema, model } = require("mongoose");

const ProductSchema = new Schema(
  {
    image: String,
    title: String,
    description: String,
    category: String,
    brand: String,
    price: Number,
    salePrice: Number,
    totalStock: Number,
    averageReview: Number,
  },
  {
    timestamps: true,
  }
);

const ProductModel = model("Product", ProductSchema);

module.exports = ProductModel;
