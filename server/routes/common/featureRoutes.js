const { Router } = require("express");
const {
  addFeaturedImage,
  getFeaturedImage,
} = require("../../controllers/common/featuresController");

const router = Router();

router.post("/add", addFeaturedImage);
router.get("/get", getFeaturedImage);

module.exports = router;
