const ProductModel = require("../../models/ProductModels");

exports.getFilteredProducts = async (req, res, next) => {
  try {
    const {
      category = [],
      brand = [],
      sortBy = "price-lowtohigh" || "",
    } = req.query;

    let filters = {};

    if (category.length > 0) filters.category = { $in: category.split(",") };
    if (brand.length > 0) filters.brand = { $in: brand.split(",") };

    let sort = {};

    switch (sortBy) {
      case "price-lowtohigh":
        sort.price = 1;
        break;
      case "price-hightolow":
        sort.price = -1;
        break;
      case "title-atoz":
        sort.title = 1;
        break;
      case "title-ztoa":
        sort.title = -1;
        break;
      default:
        sort.price = 1;
    }

    const products = await ProductModel.find(filters).sort(sort);
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error(error, "error from GET ALL PRODUCTS - BACKEND");
    return res.status(500).json({
      success: false,
      message: "Error fetching products",
    });
  }
};

exports.getProductDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error(error, "error from GET PRODUCT DETAILS - BACKEND");
    return res.status(500).json({
      success: false,
      message: "Error fetching product details",
    });
  }
};
