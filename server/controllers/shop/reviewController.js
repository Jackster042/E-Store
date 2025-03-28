const OrderModel = require("../../models/OrderModel");
const ProductModels = require("../../models/ProductModels");
const ProductReviewModel = require("../../models/ReviewModel");

exports.addProductReview = async (req, res) => {
  try {
    const { productId, userId, reviewMessage, reviewValue, userName } =
      req.body;

    if (!productId || !userId || !reviewMessage || !reviewValue || !userName) {
      return res.status(400).json({
        success: false,
        message: "Invalid input fields",
      });
    }

    const order = await OrderModel.findOne({
      userId,
      "cartItems.productId": productId,
    });
    if (!order) {
      return res.status(403).json({
        success: false,
        message: "You need to purchase product to review it.",
      });
    }

    const checkExistingReview = await ProductReviewModel.findOne({
      productId,
      userId,
    });
    if (checkExistingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this product",
      });
    }

    const newReview = new ProductReviewModel({
      productId,
      userId,
      reviewMessage,
      reviewValue,
      userName,
    });

    await newReview.save();

    const review = await ProductReviewModel.find({ productId });
    const totalReviewLength = review.length;
    const averageReview =
      review.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
      totalReviewLength;

    await ProductModels.findByIdAndUpdate(productId, {
      averageReview,
    });

    return res.status(200).json({
      success: true,
      message: "Review added successfully",
      data: newReview,
    });
  } catch (error) {
    console.error(error, "error from ADD PRODUCT REVIEW");
    return res.status(500).json({
      success: false,
      message: "Failed to add review",
      error: error.message,
    });
  }
};

exports.getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await ProductReviewModel.find({ productId });

    if (!reviews) {
      return res.status(400).json({
        success: false,
        message: "No reviews found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product reviews fetched successfully",
      data: reviews,
    });
  } catch (error) {
    console.error(error, "error from GET PRODUCT REVIEWS");
    return res.status(500).json({
      success: false,
      message: "Failed to add review",
      error: error.message,
    });
  }
};
