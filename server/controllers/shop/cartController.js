exports.addToCart = async (req, res, next) => {
  try {
    res.send("Hello from addToCart - BACKEND");
  } catch (error) {
    console.error(error, "error from addToCart - BACKEND");
    res.status(500).json({
      success: false,
      message: "Failed to add product to cart",
    });
  }
};

exports.getCart = async (req, res, next) => {
  try {
    res.send("Hello from getCart - BACKEND");
  } catch (error) {
    console.error(error, "error from getCart - BACKEND");
    res.status(500).json({
      success: false,
      message: "Failed to get cart",
    });
  }
};

exports.updateQuantity = async (req, res, next) => {
  try {
    res.send("Hello from updateQuantity - BACKEND");
  } catch (error) {
    console.error(error, "error from updateQuantity - BACKEND");
    res.status(500).json({
      success: false,
      message: "Failed to update quantity",
    });
  }
};

exports.removeFromCart = async (req, res, next) => {
  try {
    res.send("Hello from removeFromCart - BACKEND");
  } catch (error) {
    console.error(error, "error from removeFromCart - BACKEND");
    res.status(500).json({
      success: false,
      message: "Failed to remove product from cart",
    });
  }
};
