const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    pname: {
        type: String,
        required: [true, "Enter product name"],
        trim: true,
    },
    pcategory: {
        type: String,
        // required: [true, "Enter Category"],
        trim: true,
    },
    pprice: {
        type: String,
        required: [true, "Enter product price"],
        trim: true,
    },
    pdesc: {
        type: String,
        default: "No description available",
    },
    pquantity: {
        type: Number,
        required: [true, "Enter quantity"],
        minlength: 1,
    },

}, {timestamps: true} );

const Product = mongoose.model("Product", productSchema);
module.exports = Product;