const { Schema, model } = require("mongoose");

const FeatureSchema = new Schema(
  {
    name: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const FeatureModel = model("Feature", FeatureSchema);

module.exports = FeatureModel;
