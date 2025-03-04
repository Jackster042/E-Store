const { Router } = require("express");
const addressController = require("../../controllers/shop/addressController");

const router = Router();

router.post("/add", addressController.addAddress);
router.get("/get/:userId", addressController.fetchAllAddress);
router.put("/update/:userId/:addressId", addressController.updateAddress);
router.delete("/delete/:userId/:addressId", addressController.deleteAddress);

module.exports = router;
