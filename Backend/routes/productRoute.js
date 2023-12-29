const express = require("express");
const { createProduct, getProduct, deleteProduct, updateProduct, getAllProduct } = require("../controllers/productController");
const router = express.Router();
const protect = require("../middleWare/authMiddleware");

router.post("/create",protect, createProduct);
router.post("/:id",protect, getProduct);
router.post("/",protect, getAllProduct);
router.delete("/:id",protect, deleteProduct);
router.patch("/:id",protect, updateProduct);


module.exports = router;