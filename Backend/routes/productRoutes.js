const express = require("express");
const { getProducts, getProductsByCategory, addProduct } = require("../controllers/productController");

const router = express.Router();

router.get("/", getProducts);
router.get("/:category", getProductsByCategory);
router.post("/", addProduct);

module.exports = router;
