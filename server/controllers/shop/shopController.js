exports.getFilteredProducts = async (req, res, next) => {
  try {
    res.send("Hello World");
  } catch (error) {
    console.error(error, "error from GET ALL PRODUCTS - BACKEND");
    return res.status(500).json({
      success: false,
      message: "Error fetching products",
    });
  }
};
