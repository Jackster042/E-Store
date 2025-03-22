const { Schema, model } = require("mongoose");

const FeatureSchema = new Schema(
  {
    image: String,
  },
  {
    timestamps: true,
  }
);

const FeatureModel = model("Feature", FeatureSchema);

module.exports = FeatureModel;
