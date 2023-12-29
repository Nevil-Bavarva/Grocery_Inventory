const express = require("express");
const { createProduct, getProduct, deleteProduct, updateProduct } = require("../controllers/productController");
const router = express.Router();


router.post("/", createProduct);
router.post("/:id", getProduct);
router.delete("/:id", deleteProduct);
router.patch("/:id", updateProduct);


module.exports = router;