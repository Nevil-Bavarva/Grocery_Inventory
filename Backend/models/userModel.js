const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter anme"]
    },
    email: {
        type: String,
        required: [true, "Please Enter Eail"],
        uniqure: true,
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please enter a valid Email",
        ],
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
        minLength: [6, "Password must be up to 6 characters"],
    },
    photo: {
        type: String,
        required: [true, "Please add a photo"],
        default: "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png",
    },
    phone: {
        type: String,
        default: "+91",
    },
    bio: {
        type: String,
        maxLength: [250, "Bio must not be more than 250 characters"],
        default: "No product description available",
    },
}, {timestamps: true, });

//// Encrypting password (before pushing to DB)
userSchema.pre("save", async function(next) {

    if(!this.isModified("password")) {
        return next();
    }


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
})

const User = mongoose.model("User", userSchema)
module.exports = User;