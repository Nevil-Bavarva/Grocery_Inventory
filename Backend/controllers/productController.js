const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

//Create product 

const createProduct = asyncHandler(async (req, res, next) => {
    const { pname, pcategory, pquantity, pprice, pdesc } = req.body;

    if (!pname || !pquantity || !pcategory || !pprice) {
        res.status(400);
        throw new Error("Please fill all the details");
    }

    //create product if all fields are valid
    const product = await Product.create({
        pname,
        pcategory,
        pquantity,
        pprice,
        pdesc,
    });

    res.status(201).json(product);
});

// get product 
const getProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(400);
        throw new Error("No product found");
    }
    res.status(200).json(product);
});

// delete product 
const deleteProduct = asyncHandler( async (req, res)=> {
    const deletionStatus = await Product.findByIdAndDelete(req.params.id);

    //check if product deleted successfully
    if(deletionStatus) {
        res.status(200).json({
            message : "product deleted successfully",
        })
    } else {
        res.status(400).json({
            message : "product deletion unsuccessful, maybe invalid ID",
        })
    }
});


// update product 

const updateProduct = asyncHandler (async (req, res)=> {
    const { pname, pcategory, pquantity, pprice, pdesc } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
        pname,
        pcategory, 
        pquantity, 
        pprice, 
        pdesc,
    });

    res.status(200).json("product updated successfully");

});


// get all product 

const getAllProduct = asyncHandler (async (req, res)=> {
    const products = await Product.find().sort("-createdAt");
    if(products) {
        res.status(200).json(products);
    } else {
        res.status(400);
        throw new Error("No product found");
    } 
    
});

module.exports = {
    createProduct,
    getProduct,
    deleteProduct,
    updateProduct,
    getAllProduct,
};