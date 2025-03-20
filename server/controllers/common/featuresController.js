const FeatureModel = require("../../models/FeatureModel");

exports.addFeaturedImage = async (req, res) => {
  try {
    const { image } = req.body;
    if (!image) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }
    const featureImage = new FeatureModel({ image });
    await featureImage.save();
    res.status(200).json({
      success: true,
      message: "Featured Image Added Successfully",
      data: featureImage,
    });
  } catch (error) {
    console.error(error, "error from ADD FEATURED IMAGE");
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.getFeaturedImage = async (req, res) => {
  try {
    const images = await FeatureModel.find({});
    if (!images) {
      return res.status(404).json({
        success: false,
        message: "No Featured Image Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Featured Image Fetched Successfully",
      data: images,
    });
  } catch (error) {
    console.error(error, "error from GET FEATURED IMAGE");
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
