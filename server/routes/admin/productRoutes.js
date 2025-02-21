const { Router } = require("express");
const router = Router();

const {
  handleImageUpload,
  getAllProducts,
  addProduct,
  editProduct,
  deleteProduct,
} = require("../../controllers/admin/productController.js");

const { upload } = require("../../utils/cloudinary.js");

router.get("/getAllProducts", getAllProducts);
router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.post("/addProduct", addProduct);
router.put("/editProduct/:id", editProduct);
router.delete("/deleteProduct/:id", deleteProduct);

module.exports = router;
