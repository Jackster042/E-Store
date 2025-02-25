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
    console.log(products, "products from GET FILTERED PRODUCTS - BACKEND");
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
