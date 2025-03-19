const { Schema, model } = require("mongoose");

const ProductReviewSchema = new Schema(
  {
    productId: String,
    userId: String,
    userName: String,
    reviewMessage: String,
    reviewValue: Number,
  },
  {
    timestamps: true,
  }
);

const ProductReviewModel = model("ProductReview", ProductReviewSchema);

module.exports = ProductReviewModel;
