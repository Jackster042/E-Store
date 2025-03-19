const ProductModel = require("../../models/ProductModels");

exports.searchProducts = async (req, res) => {
  try {
    const { keyword } = req.params;
    if (!keyword || typeof keyword !== "string") {
      return res.status(400).json({
        success: false,
        message: "Keyword required and must be in string format",
      });
    }

    const regEx = new RegExp(keyword, "i"); // i for case insensitive
    // console.log(regEx, "regEx");

    const createSearchQuery = {
      $or: [
        { title: { $regex: regEx } },
        { description: { $regex: regEx } },
        { category: { $regex: regEx } },
        { brand: { $regex: regEx } },
      ],
    };

    const searchResult = await ProductModel.find(createSearchQuery);

    if (searchResult.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Products found",
      data: searchResult,
    });
  } catch (error) {
    console.error(error, "error from SEARCH PRODUCTS CONTROLLER");
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
